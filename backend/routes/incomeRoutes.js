import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getIncome,
  addIncome,
  updateIncome,
  deleteIncome,
  getIncomeOverview,
  exportIncome,
} from '../controllers/incomeController.js'

const router = Router()

router.use(authMiddleware)

router.get('/overview', getIncomeOverview)
router.get('/export', exportIncome)
router.get('/', getIncome)
router.post('/', addIncome)
router.put('/:id', updateIncome)
router.delete('/:id', deleteIncome)

export default router
