import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import Summary from './components/Summary.jsx'
import './App.css'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other']

function App() {
  // This array is the "source of truth" - every expense the app knows about.
  const [expenses, setExpenses] = useState([])

  // If this is set, the form switches into "edit mode" for this expense.
  const [editingExpense, setEditingExpense] = useState(null)

  // Search + filter state.
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  function handleAddOrUpdate(expenseData) {
    if (editingExpense) {
      // Replace the one matching expense, keep everyone else unchanged.
      setExpenses(
        expenses.map((e) =>
          e.id === editingExpense.id ? { ...expenseData, id: e.id } : e
        )
      )
      setEditingExpense(null)
    } else {
      // Add a new expense with a unique id.
      setExpenses([...expenses, { ...expenseData, id: crypto.randomUUID() }])
    }
  }

  function handleDelete(id) {
    setExpenses(expenses.filter((e) => e.id !== id))
    if (editingExpense?.id === id) setEditingExpense(null)
  }

  function handleEdit(expense) {
    setEditingExpense(expense)
  }

  function handleCancelEdit() {
    setEditingExpense(null)
  }

  // Apply search then category filter, in order.
  const filteredExpenses = expenses
    .filter((e) => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((e) => categoryFilter === 'All' || e.category === categoryFilter)

  return (
    <div className="app">
      <h1>💰 Personal Expense Manager</h1>

      <ExpenseForm
        categories={CATEGORIES}
        onSubmit={handleAddOrUpdate}
        editingExpense={editingExpense}
        onCancelEdit={handleCancelEdit}
      />

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <Summary expenses={filteredExpenses} />

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
