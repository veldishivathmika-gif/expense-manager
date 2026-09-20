function Summary({ expenses }) {
  // reduce() walks through the array and builds up one final number - the total.
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="summary">
      <span>Total: </span>
      <strong>${total.toFixed(2)}</strong>
      <span className="count">
        {' '}({expenses.length} expense{expenses.length !== 1 ? 's' : ''})
      </span>
    </div>
  )
}

export default Summary
