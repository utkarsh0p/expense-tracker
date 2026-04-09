import { useState } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { formatDate, formatCurrency, toInputDate } from '../utils/helpers.js'
import { CATEGORY_COLORS } from '../assets/colors.js'

export default function TransactionItem({ transaction, type, icons, categories, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    description: transaction.description,
    amount: transaction.amount,
    category: transaction.category,
    date: toInputDate(transaction.date),
    note: transaction.note || '',
  })
  const [saving, setSaving] = useState(false)

  const allCategories = categories || []
  const txType = type || transaction.type || 'expense'
  const Icon = icons?.[transaction.category]

  const colorIndex = allCategories.indexOf(transaction.category) % CATEGORY_COLORS.length
  const iconColor = CATEGORY_COLORS[colorIndex] || CATEGORY_COLORS[0]

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSave() {
    if (!form.description || !form.amount || !form.date) return
    setSaving(true)
    try {
      await onUpdate(transaction._id, { ...form, amount: parseFloat(form.amount) })
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setForm({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      date: toInputDate(transaction.date),
      note: transaction.note || '',
    })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 gap-2">
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {allCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            <X size={13} /> Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:opacity-60"
          >
            <Check size={13} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 py-3 px-1 border-b border-slate-100 last:border-0 group">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconColor + '20' }}
      >
        {Icon ? (
          <Icon size={16} style={{ color: iconColor }} />
        ) : (
          <span className="text-xs font-bold" style={{ color: iconColor }}>
            {transaction.category?.[0]}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{transaction.description}</p>
        <p className="text-xs text-slate-400">{transaction.category} · {formatDate(transaction.date)}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="text-sm font-semibold"
          style={{ color: txType === 'income' ? '#0d9488' : '#f97316' }}
        >
          {txType === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(transaction._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
