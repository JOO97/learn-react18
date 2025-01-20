import { useSelector } from 'react-redux'

export default function User() {
  const { username } = useSelector((store) => store.user)

  return <div>{username}</div>
}
