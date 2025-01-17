export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints
}) {
  return (
    <header className="progress">
      <progress value={index} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}
