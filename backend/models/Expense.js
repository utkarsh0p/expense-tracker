import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0.01 },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Education', 'Entertainment', 'Other'],
    required: true,
  },
  date: { type: Date, required: true },
  note: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

expenseSchema.index({ userId: 1, date: -1 })

export default mongoose.model('Expense', expenseSchema)
