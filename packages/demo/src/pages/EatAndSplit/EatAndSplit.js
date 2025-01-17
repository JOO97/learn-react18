import { use, useState } from 'react'
import './index.css'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0
  }
]

export default function EatAndSplit() {
  const [friends, setFriends] = useState(initialFriends)
  const [curSelect, setCurSelect] = useState(null)
  const [showAddFriend, setShowAddFriend] = useState(false)

  function handleSelectFriend(selected) {
    setCurSelect(curSelect && selected.id === curSelect.id ? null : selected)
  }

  return (
    <>
      <div className="sidebar">
        <FriendsList
          data={friends}
          active={curSelect ? curSelect.id : ''}
          onSelect={handleSelectFriend}
        ></FriendsList>
        {showAddFriend && (
          <FormAddFriend
            onAdd={(info) => {
              setFriends((n) => [
                ...n,
                {
                  ...info,
                  id: Date.now(),
                  balance: 0
                }
              ])
            }}
          />
        )}
        <button onClick={() => setShowAddFriend(!showAddFriend)}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </button>
      </div>
      {curSelect && (
        <FormSplitBill
          key={curSelect.id}
          info={curSelect}
          onSubmit={(balance) => {
            setFriends((f) =>
              f.map((n) => {
                return {
                  ...n,
                  balance:
                    n.id === curSelect.id ? n.balance + balance : n.balance
                }
              })
            )
            setCurSelect(null)
          }}
        />
      )}
    </>
  )
}

function FriendsList({ data, active, onSelect }) {
  return (
    <ul>
      {data.map((d) => (
        <Friend {...d} onSelect={() => onSelect(d)} active={active}></Friend>
      ))}
    </ul>
  )
}

function Friend({ image, name, balance, active, onSelect }) {
  return (
    <li>
      <img src={image} />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">
          You owe ${name}${balance}
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          ${name} owes you ${balance}
        </p>
      )}
      {balance === 0 && <p className="green">You and {name} are even</p>}
      <button className="button" onClick={onSelect}>
        {active ? 'Close' : 'Select'}
      </button>
    </li>
  )
}

function FormAddFriend({ onAdd }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  function handleSubmit(e) {
    e.preventDefault()

    onAdd({
      name,
      image
    })
    setName('')
    setImage('')
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

function FormSplitBill({ info, onSubmit }) {
  const [bill, setBill] = useState(0)
  const [paidByUser, setPaidByUser] = useState(0)
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  const paidByFriend = bill - paidByUser

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {info.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👫 {info.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{info.name}</option>
      </select>

      <button>Split bill</button>
    </form>
  )
}
