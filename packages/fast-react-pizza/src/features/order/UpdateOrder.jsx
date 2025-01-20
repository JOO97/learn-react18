import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../service/apiRestaurant'

export default function UpdateOrder() {
  const fetcher = useFetcher()

  return (
    // <fetch.Form /> 不会提交
    <fetcher.Form method="PATCH">
      <Button>Make Priority</Button>
    </fetcher.Form>
  )
}

export async function action({ request, params }) {
  const data = { priority: true }
  await updateOrder(params.orderId, data)
  return null
}
