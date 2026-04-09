import { Router } from 'express'
import { register, login, getProfile, changePassword } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)
router.put('/password', authMiddleware, changePassword)

export default router
