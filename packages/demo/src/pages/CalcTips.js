import { useState } from 'react'

const options = [
  {
    label: '5%',
    value: 0.05
  },
  {
    label: '10%',
    value: 0.1
  },
  {
    label: '20%',
    value: 0.2
  }
]

function CalcTips() {
  const [bill, setBill] = useState(0)
  const [tip1, setTip1] = useState(0.05)
  const [tip2, setTip2] = useState(0.05)

  const tip = ((tip1 + tip2) / 2) * bill
  const total = bill + tip

  return (
    <div>
      <label>how much was the bill?</label>
      <input
        value={bill}
        type="number"
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <br />
      <label>how did you like the service?</label>
      <select value={tip1} onChange={(e) => setTip1(e.target.value * 1)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <br />
      <label>how did your friend like the service?</label>
      <select value={tip2} onChange={(e) => setTip2(e.target.value * 1)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <h2>
        You pay ${total} (${bill} + ${tip} tip)
      </h2>
      <button
        onClick={() => {
          setBill(0)
          setTip1(0.05)
          setTip2(0.05)
        }}
      >
        RESET
      </button>
    </div>
  )
}

export default CalcTips
