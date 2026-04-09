import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0.01 },
  category: {
    type: String,
    enum: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Gift', 'Other'],
    required: true,
  },
  date: { type: Date, required: true },
  note: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

incomeSchema.index({ userId: 1, date: -1 })

export default mongoose.model('Income', incomeSchema)
