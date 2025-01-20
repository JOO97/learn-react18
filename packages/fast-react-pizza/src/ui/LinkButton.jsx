import { Link, useNavigate } from 'react-router-dom'

export default function LinkButton({ to, children }) {
  const navigate = useNavigate()
  const className = 'text-blue-300 hover:text-blue-400'

  if (to === '-1')
    return (
      <button
        onClick={() => navigate(-1)}
        className={className}
      >
        &larr; Go back
      </button>
    )
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
