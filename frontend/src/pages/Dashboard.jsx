import { useState, useEffect } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Plus } from 'lucide-react'
import api from '../utils/api.js'
import { formatCurrency, formatDate } from '../utils/helpers.js'
import { GAUGE_COLORS } from '../assets/colors.js'
import { EXPENSE_ICONS, INCOME_ICONS } from '../assets/categories.js'
import GaugeCard from '../components/GaugeCard.jsx'
import InsightCard from '../components/InsightCard.jsx'
import AddTransactionModal from '../components/AddTransactionModal.jsx'
import { buildPieChartData, buildLineChartData, pieChartOptions, lineChartOptions } from '../utils/chartHelpers.js'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAllRecent, setShowAllRecent] = useState(false)

  async function fetchDashboard() {
    setLoading(true)
    try {
      const res = await api.get('/dashboard')
      setData(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  async function handleAdd(type, formData) {
    const endpoint = type === 'income' ? '/income' : '/expenses'
    await api.post(endpoint, formData)
    fetchDashboard()
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse h-44">
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-4" />
              <div className="w-24 h-12 bg-slate-100 rounded-full mx-auto mb-3" />
              <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse h-64" />
          ))}
        </div>
      </div>
    )
  }

  const {
    monthlyIncome = 0,
    monthlyExpense = 0,
    savings = 0,
    categoryDistribution = [],
    sixMonthsData = [],
    recentTransactions = [],
    insights = [],
  } = data || {}

  const maxForGauge = Math.max(monthlyIncome, monthlyExpense, 1)
  const recentVisible = showAllRecent ? recentTransactions : recentTransactions.slice(0, 5)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Dashboard</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your financial summary for this month</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GaugeCard
          label="Income"
          value={monthlyIncome}
          maxValue={maxForGauge}
          colors={GAUGE_COLORS.income}
          subtitle="this month"
        />
        <GaugeCard
          label="Spent"
          value={monthlyExpense}
          maxValue={maxForGauge}
          colors={GAUGE_COLORS.expense}
          subtitle="this month"
        />
        <GaugeCard
          label="Savings"
          value={savings}
          maxValue={Math.max(monthlyIncome, 1)}
          colors={GAUGE_COLORS.savings}
          subtitle={savings >= 0 ? 'saved so far' : 'over budget'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Spending by Category</h3>
          {categoryDistribution.length > 0 ? (
            <div className="h-56">
              <Doughnut
                data={buildPieChartData(categoryDistribution)}
                options={pieChartOptions}
              />
            </div>
          ) : (
            <div className="h-56 flex items-center justify-center">
              <p className="text-slate-400 text-sm">No expense data this month</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Recent Transactions</h3>
          {recentTransactions.length === 0 ? (
            <div className="h-56 flex flex-col items-center justify-center gap-2">
              <p className="text-slate-400 text-sm">No transactions yet</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-teal-600 text-xs font-medium hover:underline"
              >
                Add your first one
              </button>
            </div>
          ) : (
            <div>
              {recentVisible.map((tx) => {
                const icons = tx.type === 'income' ? INCOME_ICONS : EXPENSE_ICONS
                const Icon = icons[tx.category]
                const color = tx.type === 'income' ? '#0d9488' : '#f97316'
                return (
                  <div key={tx._id} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                      {Icon ? <Icon size={14} style={{ color }} /> : <span className="text-xs font-bold" style={{ color }}>{tx.category?.[0]}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{tx.description}</p>
                      <p className="text-xs text-slate-400">{formatDate(tx.date)}</p>
                    </div>
                    <span className="text-sm font-semibold flex-shrink-0" style={{ color }}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </div>
                )
              })}
              {recentTransactions.length > 5 && (
                <button
                  onClick={() => setShowAllRecent((v) => !v)}
                  className="mt-2 w-full text-center text-xs text-teal-600 hover:text-teal-700 font-medium py-1"
                >
                  {showAllRecent ? 'Show less' : `Show all ${recentTransactions.length}`}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {sixMonthsData.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Income vs Expenses (Last 6 Months)</h3>
          <div className="h-56">
            <Line data={buildLineChartData(sixMonthsData)} options={lineChartOptions} />
          </div>
        </div>
      )}

      {insights.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Smart Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} />
            ))}
          </div>
        </div>
      )}

      <AddTransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdd}
        defaultType="expense"
      />
    </div>
  )
}
