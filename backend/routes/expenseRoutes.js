import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenseOverview,
  exportExpenses,
} from '../controllers/expenseController.js'

const router = Router()

router.use(authMiddleware)

router.get('/overview', getExpenseOverview)
router.get('/export', exportExpenses)
router.get('/', getExpenses)
router.post('/', addExpense)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router
