import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../service/apiRestaurant'
import MenuItem from './MenuItem'

function Menu() {
  const menu = useLoaderData()
  console.log('menu', menu)

  return (
    <ul>
      {menu.map((m) => (
        <MenuItem pizza={m} key={m.id} />
      ))}
    </ul>
  )
}

export async function loader() {
  const menu = await getMenu()
  return menu
}

export default Menu
