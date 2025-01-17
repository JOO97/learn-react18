import Logo from './components/Logo'
import Form from './components/Form'
import List from './components/List'
import Stats from './components/Stats'
import { useState } from 'react'

function TravelList() {
  const [items, setItems] = useState([])
  const total = items.length
  const packedCount = items.filter((n) => n.packed).length

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    )

    if (confirmed) setItems([])
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }
  return (
    <div>
      <Logo />
      <Form onSubmit={handleAddItems} />
      <List
        items={items}
        onToggleItem={handleToggleItem}
        onClear={handleClearList}
        onDeleteItem={handleDeleteItem}
      />
      <Stats total={total} packedCount={packedCount} />
    </div>
  )
}

export default TravelList
