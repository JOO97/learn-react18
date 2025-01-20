import Button from '../../ui/Button'
import {
  decreaseItemQuantity,
  increaseItemQuantity
} from './cartSlice'
import { useDispatch } from 'react-redux'

export default function UpdateItemQuantity({
  pizzaId,
  currentQuantity
}) {
  const dispatch = useDispatch()

  return (
    <div>
      <Button
        type="round"
        onClick={() =>
          dispatch(decreaseItemQuantity(pizzaId))
        }
      >
        -
      </Button>
      <span className="mx-3">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() =>
          dispatch(increaseItemQuantity(pizzaId))
        }
      >
        +
      </Button>
    </div>
  )
}
