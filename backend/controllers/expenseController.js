import Expense from '../models/Expense.js'
import { getDateRange } from '../utils/dateFilter.js'

export async function getExpenses(req, res) {
  try {
    const { range, category, startDate, endDate } = req.query
    const query = { userId: req.user.id }

    if (range && range !== 'all') {
      const { start, end } = getDateRange(range)
      query.date = { $gte: start, $lte: end }
    } else if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) }
    }

    if (category && category !== 'All') query.category = category

    const expenses = await Expense.find(query).sort({ date: -1 })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function addExpense(req, res) {
  try {
    const { description, amount, category, date, note } = req.body
    if (!description || !amount || !category || !date) {
      return res.status(400).json({ message: 'Required fields missing' })
    }
    const expense = await Expense.create({
      userId: req.user.id,
      description,
      amount,
      category,
      date: new Date(date),
      note: note || '',
    })
    res.status(201).json(expense)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function updateExpense(req, res) {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id })
    if (!expense) return res.status(404).json({ message: 'Expense not found' })

    const { description, amount, category, date, note } = req.body
    if (description) expense.description = description
    if (amount) expense.amount = amount
    if (category) expense.category = category
    if (date) expense.date = new Date(date)
    if (note !== undefined) expense.note = note

    await expense.save()
    res.json(expense)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function deleteExpense(req, res) {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!expense) return res.status(404).json({ message: 'Expense not found' })
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getExpenseOverview(req, res) {
  try {
    const { range } = req.query
    const query = { userId: req.user.id }

    if (range && range !== 'all') {
      const { start, end } = getDateRange(range)
      query.date = { $gte: start, $lte: end }
    }

    const expenses = await Expense.find(query)
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    const average = expenses.length ? total / expenses.length : 0

    const categoryMap = {}
    expenses.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount
    })
    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || null

    res.json({ total, average, count: expenses.length, topCategory })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function exportExpenses(req, res) {
  try {
    const { range, startDate, endDate } = req.query
    const query = { userId: req.user.id }

    if (range && range !== 'all') {
      const { start, end } = getDateRange(range)
      query.date = { $gte: start, $lte: end }
    } else if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) }
    }

    const expenses = await Expense.find(query).sort({ date: -1 })

    const header = 'Date,Description,Category,Amount,Note'
    const rows = expenses.map((e) =>
      [
        new Date(e.date).toLocaleDateString(),
        `"${e.description}"`,
        e.category,
        e.amount.toFixed(2),
        `"${e.note || ''}"`,
      ].join(',')
    )

    const csv = [header, ...rows].join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"')
    res.send(csv)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
