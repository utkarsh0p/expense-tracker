import { useState, useEffect, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import api from '../utils/api.js'
import { formatCurrency, safeArray } from '../utils/helpers.js'
import { EXPENSE_CATEGORIES, EXPENSE_ICONS } from '../assets/categories.js'
import TimeFrameSelector from '../components/TimeFrameSelector.jsx'
import TransactionItem from '../components/TransactionItem.jsx'
import AddTransactionModal from '../components/AddTransactionModal.jsx'
import ExportButton from '../components/ExportButton.jsx'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [overview, setOverview] = useState({ total: 0, average: 0, count: 0 })
  const [timeFrame, setTimeFrame] = useState('month')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  async function fetchData(range) {
    setLoading(true)
    try {
      const [expRes, ovRes] = await Promise.all([
        api.get('/expenses', { params: { range } }),
        api.get('/expenses/overview', { params: { range } }),
      ])
      setExpenses(safeArray(expRes))
      setOverview(ovRes.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(timeFrame)
    setShowAll(false)
    setCategoryFilter('All')
  }, [timeFrame])

  const filtered = useMemo(() => {
    if (categoryFilter === 'All') return expenses
    return expenses.filter((e) => e.category === categoryFilter)
  }, [expenses, categoryFilter])

  const chartData = useMemo(() => {
    const grouped = {}
    filtered.forEach((e) => {
      const day = new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      grouped[day] = (grouped[day] || 0) + e.amount
    })
    const labels = Object.keys(grouped).slice(-14)
    return {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data: labels.map((l) => grouped[l]),
          backgroundColor: 'rgba(249, 115, 22, 0.8)',
          borderRadius: 6,
        },
      ],
    }
  }, [filtered])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: (v) => '₹' + v.toLocaleString('en-IN') },
      },
      x: { grid: { display: false } },
    },
  }

  async function handleAdd(type, data) {
    await api.post('/expenses', data)
    fetchData(timeFrame)
  }

  async function handleUpdate(id, data) {
    await api.put(`/expenses/${id}`, data)
    fetchData(timeFrame)
  }

  async function handleDelete(id) {
    await api.delete(`/expenses/${id}`)
    fetchData(timeFrame)
  }

  const visible = showAll ? filtered : filtered.slice(0, 8)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Expenses</h2>
          <p className="text-sm text-slate-500 mt-0.5">Track and manage your spending</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <ExportButton endpoint="/expenses/export" filename="expenses.csv" params={{ range: timeFrame }} color="orange" />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Expense
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <TimeFrameSelector value={timeFrame} onChange={setTimeFrame} color="orange" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Spent', value: formatCurrency(overview.total), sub: 'this period' },
            { label: 'Avg per Transaction', value: formatCurrency(overview.average), sub: `across ${overview.count} transactions` },
            { label: 'Transactions', value: overview.count, sub: 'recorded entries' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-2xl font-bold text-orange-500 mt-1">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Spending Pattern</h3>
          <div className="h-48">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Transactions</h3>
          <div className="flex gap-1.5 flex-wrap">
            {['All', ...EXPENSE_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 bg-slate-200 rounded-xl" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400 text-sm">No expenses found</p>
            <p className="text-slate-300 text-xs mt-1">Add your first expense to get started</p>
          </div>
        ) : (
          <>
            {visible.map((e) => (
              <TransactionItem
                key={e._id}
                transaction={e}
                type="expense"
                icons={EXPENSE_ICONS}
                categories={EXPENSE_CATEGORIES}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
            {filtered.length > 8 && (
              <button
                onClick={() => setShowAll((v) => !v)}
                className="mt-3 w-full text-center text-sm text-teal-600 hover:text-teal-700 font-medium py-2"
              >
                {showAll ? 'Show less' : `Show all ${filtered.length} transactions`}
              </button>
            )}
          </>
        )}
      </div>

      <AddTransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdd}
        defaultType="expense"
      />
    </div>
  )
}
