// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import styles from './Form.module.css'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'
import { useEffect } from 'react'
import Spinner from './Spinner'
import Message from './Message'
import BackButton from './BackButton'
import { useCities } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function Form() {
  const [lat, lng] = useUrlPosition()
  const { createCity, isLoading } = useCities()

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [geocodingError, setGeocodingError] = useState('')
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [emoji, setEmoji] = useState('')

  const navigate = useNavigate()

  useEffect(
    function () {
      if (!lat && !lng) return

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true)
          setGeocodingError('')

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          )
          const data = await res.json()
          console.log(data)

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            )

          setCityName(data.city || data.locality || '')
          setCountry(data.countryName)
          setEmoji(convertToEmoji(data.countryCode))
        } catch (err) {
          setGeocodingError(err.message)
        } finally {
          setIsLoadingGeocoding(false)
        }
      }
      fetchCityData()
    },
    [lat, lng]
  )

  async function handleSubmit(e) {
    e.preventDefault()
    if (!cityName || !date) return
    const newCity = {
      emoji,
      cityName,
      country,
      date,
      position: {
        lng,
        lat
      },
      notes
    }
    await createCity(newCity)
    navigate('/app/cities')
  }

  function handleAddCity() {}

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />

  if (isLoadingGeocoding) return <Spinner />
  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleAddCity}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
