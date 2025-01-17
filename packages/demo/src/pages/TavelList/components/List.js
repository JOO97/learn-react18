import { useState } from 'react'
import Item from './Item'

export default function List({ items, onToggleItem, onDeleteItem, onClear }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedList

  if (sortBy === 'input') sortedList = items
  else if (sortBy === 'description')
    sortedList = items.slice().sort((a, b) => a.text.localeCompare(b.text))
  else if (sortBy === 'packed')
    sortedList = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed))

  return (
    <div className="list">
      <ul>
        {sortedList.map((n) => (
          <Item
            key={n.id}
            checked={n.packed}
            label={`${n.count} ${n.text}`}
            onToggleItem={() => onToggleItem(n.id)}
            onDeleteItem={() => onDeleteItem(n.id)}
          ></Item>
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onClear()}>CLEAR LIST</button>
      </div>
    </div>
  )
}
