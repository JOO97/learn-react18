import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchOrder() {
  const [query, setQuery] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!query) return

    navigate(`/order/${query}`)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-3 py-2 text-sm outline-none transition-all placeholder:text-stone-400 focus:ring focus:ring-yellow-500/50 sm:w-64 sm:focus:w-72"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
