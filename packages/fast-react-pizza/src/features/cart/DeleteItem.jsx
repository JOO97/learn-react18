import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice'
import Button from '../../ui/Button'

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch()

  function handleDelItem() {
    dispatch(deleteItem(pizzaId))
  }

  return (
    <Button type="small" onClick={handleDelItem}>
      Delete
    </Button>
  )
}
