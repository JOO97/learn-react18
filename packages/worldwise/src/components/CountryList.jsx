import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext'

export default function CountryList() {
  const { cities, isLoading } = useCities

  if (isLoading) return <Spinner />

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }]
    else return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((c) => (
        <CountryItem country={c} key={c.country} />
      ))}
    </ul>
  )
}
