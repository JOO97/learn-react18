import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()
  const {
    emoji,
    cityName,
    date,
    id,
    position: { lng, lat }
  } = city

  function handleDeleteCity(e) {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles['cityItem--active'] : ''
        }`}
        to={`/app/cities/${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  )
}
