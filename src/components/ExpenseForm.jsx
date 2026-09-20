import { useState, useEffect } from 'react'

function ExpenseForm({ categories, onSubmit, editingExpense, onCancelEdit }) {
  // Each input has its own piece of state - this is what "controlled input" means.
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState('')

  // When the user clicks "Edit" on an expense, fill the form with its values.
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title)
      setAmount(String(editingExpense.amount))
      setCategory(editingExpense.category)
      setDate(editingExpense.date)
    }
  }, [editingExpense])

  function handleSubmit(e) {
    e.preventDefault()

    // Simple validation - don't submit if required fields are empty.
    if (!title.trim() || !amount || !date) return

    onSubmit({
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
    })

    // Clear the form after submitting.
    setTitle('')
    setAmount('')
    setCategory(categories[0])
    setDate('')
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title (e.g. Groceries)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
      {editingExpense && (
        <button type="button" onClick={onCancelEdit}>Cancel</button>
      )}
    </form>
  )
}

export default ExpenseForm
