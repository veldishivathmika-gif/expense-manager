function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <li className="expense-item">
      <div className="expense-info">
        <strong>{expense.title}</strong>
        <span className="category-badge">{expense.category}</span>
        <span className="date">{expense.date}</span>
      </div>
      <div className="expense-actions">
        <span className="amount">${expense.amount.toFixed(2)}</span>
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={() => onDelete(expense.id)}>Delete</button>
      </div>
    </li>
  )
}

export default ExpenseItem
