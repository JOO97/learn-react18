// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate
} from '../../utils/helpers'
import { getOrder } from '../../service/apiRestaurant'
import OrderItem from './OrderItem'
import { useEffect } from 'react'
import UpdateOrder from './UpdateOrder'

function Order() {
  const order = useLoaderData()

  /* 用router中定义的loader */
  const fetcher = useFetcher()

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle')
      fetcher.load('/menu')
  }, [fetcher])

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart
  } = order

  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  console.log(priority)

  return (
    <div className="space-y-8 px-4 py-3">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">
          Order #{id} status
        </h2>

        <div>
          {priority && (
            <span className="mr-1 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase text-stone-100">
              Priority
            </span>
          )}
          <span className="mr-1 rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-stone-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex justify-between rounded-md bg-stone-100 px-4 py-5">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery:{' '}
          {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul>
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={
              fetcher.state === 'loading'
            }
            ingredients={
              fetcher.data?.find(
                (d) => d.id === item.pizzaId
              )?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-1 bg-stone-100 px-4 py-5 font-bold text-stone-500">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-stone-700">
          To pay on delivery:{' '}
          {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <div className="text-right">
          <UpdateOrder />
        </div>
      )}
    </div>
  )
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId)
  return order
}

export default Order
