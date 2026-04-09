import Income from '../models/Income.js'
import { getDateRange } from '../utils/dateFilter.js'

export async function getIncome(req, res) {
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

    const income = await Income.find(query).sort({ date: -1 })
    res.json(income)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function addIncome(req, res) {
  try {
    const { description, amount, category, date, note } = req.body
    if (!description || !amount || !category || !date) {
      return res.status(400).json({ message: 'Required fields missing' })
    }
    const income = await Income.create({
      userId: req.user.id,
      description,
      amount,
      category,
      date: new Date(date),
      note: note || '',
    })
    res.status(201).json(income)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function updateIncome(req, res) {
  try {
    const income = await Income.findOne({ _id: req.params.id, userId: req.user.id })
    if (!income) return res.status(404).json({ message: 'Income not found' })

    const { description, amount, category, date, note } = req.body
    if (description) income.description = description
    if (amount) income.amount = amount
    if (category) income.category = category
    if (date) income.date = new Date(date)
    if (note !== undefined) income.note = note

    await income.save()
    res.json(income)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function deleteIncome(req, res) {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!income) return res.status(404).json({ message: 'Income not found' })
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getIncomeOverview(req, res) {
  try {
    const { range } = req.query
    const query = { userId: req.user.id }

    if (range && range !== 'all') {
      const { start, end } = getDateRange(range)
      query.date = { $gte: start, $lte: end }
    }

    const income = await Income.find(query)
    const total = income.reduce((sum, i) => sum + i.amount, 0)
    const average = income.length ? total / income.length : 0

    const categoryMap = {}
    income.forEach((i) => {
      categoryMap[i.category] = (categoryMap[i.category] || 0) + i.amount
    })
    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || null

    res.json({ total, average, count: income.length, topCategory })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function exportIncome(req, res) {
  try {
    const { range, startDate, endDate } = req.query
    const query = { userId: req.user.id }

    if (range && range !== 'all') {
      const { start, end } = getDateRange(range)
      query.date = { $gte: start, $lte: end }
    } else if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) }
    }

    const income = await Income.find(query).sort({ date: -1 })

    const header = 'Date,Description,Category,Amount,Note'
    const rows = income.map((i) =>
      [
        new Date(i.date).toLocaleDateString(),
        `"${i.description}"`,
        i.category,
        i.amount.toFixed(2),
        `"${i.note || ''}"`,
      ].join(',')
    )

    const csv = [header, ...rows].join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="income.csv"')
    res.send(csv)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
