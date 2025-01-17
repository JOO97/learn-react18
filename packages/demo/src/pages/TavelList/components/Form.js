import { useState } from 'react'

export default function Form({ onSubmit }) {
  const [input, setInput] = useState('')
  const [select, setSelect] = useState(1)

  return (
    <div className="add-form">
      <div>What do you need for your 😍 trip?</div>
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        {/* {options.map((n) => (
          <option value={n}>{n}</option>
        ))} */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          if (!input) return
          onSubmit({
            count: select,
            text: input,
            packed: false,
            id: String(Math.random()).slice(-4)
          })
        }}
      >
        ADD
      </button>
    </div>
  )
}
