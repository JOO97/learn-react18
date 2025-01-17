import { useEffect, useState } from 'react'

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    callback?.()
    const controller = new AbortController()
    async function fetchMovies() {
      try {
        setIsLoading(true)

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=f84fc31d&s=${query}`,
          { signal: controller.signal }
        )
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies')

        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found')

        setIsLoading(false)
        setMovies(data.Search)
        setError('')
      } catch (err) {
        // NOTE: 终止请求会被当作是异常
        // 当 abort() 被调用时，这个 fetch() promise 将 reject 一个名为 AbortError 的 DOMException。
        if (err.name !== 'AbortError') {
          console.log(err.message)
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length < 3) {
      setError('')
      setMovies([])
      return
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [query])

  return {
    isLoading,
    error,
    movies
  }
}
