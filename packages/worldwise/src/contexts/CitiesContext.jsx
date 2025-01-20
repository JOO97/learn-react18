import { useReducer } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const BASE_URL = 'http://localhost:9000'
const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      break
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  async function getCity(id) {
    if (Number(id) === currentCity?.id) return
    try {
      dispatch({ type: 'loading', payload: true })
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      dispatch({
        type: 'city/loaded',
        payload: data
      })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...'
      })
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading', payload: true })
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      dispatch({
        type: 'city/created',
        payload: data
      })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city...'
      })
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading', payload: true })
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      dispatch({
        type: 'city/deleted',
        payload: id
      })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city...'
      })
    }
  }

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading', payload: true })
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...'
        })
      }
    }
    fetchCities()
  }, [])

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (!context) throw new Error('')
  return context
}

export { CitiesProvider, useCities }