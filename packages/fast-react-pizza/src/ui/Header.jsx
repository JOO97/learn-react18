import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between bg-yellow-400 px-4">
      <Link to="/" className="uppercase tracking-[.15rem]">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  )
}
