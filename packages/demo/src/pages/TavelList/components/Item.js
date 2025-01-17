export default function Item({ checked, label, onToggleItem, onDeleteItem }) {
  console.log('checked', checked)
  return (
    <li>
      <input type="checkbox" value={checked} onChange={() => onToggleItem()} />
      <label>
        <span style={checked ? { textDecoration: 'line-through' } : {}}>
          {label}
        </span>
        <button onClick={() => onDeleteItem()}>❌</button>
      </label>
    </li>
  )
}
