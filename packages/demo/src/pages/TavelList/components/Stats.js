function Stats({ total, packedCount }) {
  if (!total) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    )
  }

  const percent = Math.round((packedCount / total) * 100)

  return (
    <div>
      {percent === 100
        ? 'You got everything! Ready to go ✈️'
        : `💼 You have ${total} items on your list, and you already packed 
      ${packedCount} ${percent}%`}
    </div>
  )
}

export default Stats
