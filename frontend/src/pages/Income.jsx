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
import { INCOME_CATEGORIES, INCOME_ICONS } from '../assets/categories.js'
import TimeFrameSelector from '../components/TimeFrameSelector.jsx'
import TransactionItem from '../components/TransactionItem.jsx'
import AddTransactionModal from '../components/AddTransactionModal.jsx'
import ExportButton from '../components/ExportButton.jsx'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Income() {
  const [income, setIncome] = useState([])
  const [overview, setOverview] = useState({ total: 0, average: 0, count: 0 })
  const [timeFrame, setTimeFrame] = useState('month')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  async function fetchData(range) {
    setLoading(true)
    try {
      const [incRes, ovRes] = await Promise.all([
        api.get('/income', { params: { range } }),
        api.get('/income/overview', { params: { range } }),
      ])
      setIncome(safeArray(incRes))
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
    if (categoryFilter === 'All') return income
    return income.filter((i) => i.category === categoryFilter)
  }, [income, categoryFilter])

  const chartData = useMemo(() => {
    const grouped = {}
    filtered.forEach((i) => {
      const day = new Date(i.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      grouped[day] = (grouped[day] || 0) + i.amount
    })
    const labels = Object.keys(grouped).slice(-14)
    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: labels.map((l) => grouped[l]),
          backgroundColor: 'rgba(13, 148, 136, 0.8)',
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
    await api.post('/income', data)
    fetchData(timeFrame)
  }

  async function handleUpdate(id, data) {
    await api.put(`/income/${id}`, data)
    fetchData(timeFrame)
  }

  async function handleDelete(id) {
    await api.delete(`/income/${id}`)
    fetchData(timeFrame)
  }

  const visible = showAll ? filtered : filtered.slice(0, 8)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Income</h2>
          <p className="text-sm text-slate-500 mt-0.5">Track your earnings and revenue</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <ExportButton endpoint="/income/export" filename="income.csv" params={{ range: timeFrame }} color="teal" />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Income
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <TimeFrameSelector value={timeFrame} onChange={setTimeFrame} color="teal" />
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
            { label: 'Total Earned', value: formatCurrency(overview.total), sub: 'this period' },
            { label: 'Avg per Transaction', value: formatCurrency(overview.average), sub: `across ${overview.count} entries` },
            { label: 'Transactions', value: overview.count, sub: 'recorded entries' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-2xl font-bold text-teal-600 mt-1">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Income Pattern</h3>
          <div className="h-48">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Transactions</h3>
          <div className="flex gap-1.5 flex-wrap">
            {['All', ...INCOME_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-teal-600 text-white'
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
            <p className="text-slate-400 text-sm">No income recorded</p>
            <p className="text-slate-300 text-xs mt-1">Add your first income entry to get started</p>
          </div>
        ) : (
          <>
            {visible.map((i) => (
              <TransactionItem
                key={i._id}
                transaction={i}
                type="income"
                icons={INCOME_ICONS}
                categories={INCOME_CATEGORIES}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
            {filtered.length > 8 && (
              <button
                onClick={() => setShowAll((v) => !v)}
                className="mt-3 w-full text-center text-sm text-teal-600 hover:text-teal-700 font-medium py-2"
              >
                {showAll ? 'Show less' : `Show all ${filtered.length} entries`}
              </button>
            )}
          </>
        )}
      </div>

      <AddTransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdd}
        defaultType="income"
      />
    </div>
  )
}
