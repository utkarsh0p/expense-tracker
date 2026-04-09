import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getDashboardData } from '../controllers/dashboardController.js'

const router = Router()

router.get('/', authMiddleware, getDashboardData)

export default router
