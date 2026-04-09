import Expense from '../models/Expense.js'
import Income from '../models/Income.js'
import { getCurrentMonthRange, getPrevMonthRange } from '../utils/dateFilter.js'
import { generateInsights } from '../utils/insightsEngine.js'

export async function getDashboardData(req, res) {
  try {
    const userId = req.user.id
    const { start: curStart, end: curEnd } = getCurrentMonthRange()
    const { start: prevStart, end: prevEnd } = getPrevMonthRange()

    const [currentExpenses, currentIncomes, prevExpenses, prevIncomes] = await Promise.all([
      Expense.find({ userId, date: { $gte: curStart, $lte: curEnd } }),
      Income.find({ userId, date: { $gte: curStart, $lte: curEnd } }),
      Expense.find({ userId, date: { $gte: prevStart, $lte: prevEnd } }),
      Income.find({ userId, date: { $gte: prevStart, $lte: prevEnd } }),
    ])

    const monthlyIncome = currentIncomes.reduce((sum, i) => sum + i.amount, 0)
    const monthlyExpense = currentExpenses.reduce((sum, e) => sum + e.amount, 0)
    const savings = monthlyIncome - monthlyExpense
    const savingsRate = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0

    const categoryMap = {}
    currentExpenses.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount
    })
    const categoryDistribution = Object.entries(categoryMap).map(([category, total]) => ({
      category,
      total,
      percentage: monthlyExpense > 0 ? Math.round((total / monthlyExpense) * 100) : 0,
    }))

    const now = new Date()
    const sixMonthsData = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const mStart = new Date(d.getFullYear(), d.getMonth(), 1)
      const mEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)

      const [mExpenses, mIncomes] = await Promise.all([
        Expense.find({ userId, date: { $gte: mStart, $lte: mEnd } }),
        Income.find({ userId, date: { $gte: mStart, $lte: mEnd } }),
      ])

      sixMonthsData.push({
        month: d.toLocaleString('default', { month: 'short' }),
        income: mIncomes.reduce((s, i) => s + i.amount, 0),
        expense: mExpenses.reduce((s, e) => s + e.amount, 0),
      })
    }

    const allTx = [
      ...currentExpenses.map((e) => ({ ...e.toObject(), type: 'expense' })),
      ...currentIncomes.map((i) => ({ ...i.toObject(), type: 'income' })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8)

    const insights = generateInsights(currentExpenses, prevExpenses, monthlyIncome, monthlyExpense)

    res.json({
      monthlyIncome,
      monthlyExpense,
      savings,
      savingsRate,
      categoryDistribution,
      sixMonthsData,
      recentTransactions: allTx,
      insights,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
