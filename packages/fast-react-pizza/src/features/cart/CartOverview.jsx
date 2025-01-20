import { useSelector } from 'react-redux'
import {
  Link,
  useLocation,
  useNavigation
} from 'react-router-dom'
import {
  getTotalCartPrice,
  getTotalCartQuantity
} from './cartSlice'
import { formatCurrency } from '../../utils/helpers'

function CartOverview() {
  const { pathname } = useLocation()
  const totalCartQuantity = useSelector(
    getTotalCartQuantity
  )
  const totalCartPrice = useSelector(getTotalCartPrice)

  if (pathname === '/cart' || totalCartQuantity < 1)
    return null

  return (
    <div className="flex h-14 items-center justify-between bg-stone-800 px-4 uppercase text-stone-100">
      <p>
        <span className="mr-5">
          {totalCartQuantity} pizzas
        </span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
