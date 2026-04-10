import { useState } from 'react'
import { Eye, EyeOff, X, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../utils/api.js'
import { getInitials, formatDate } from '../utils/helpers.js'

function ChangePasswordModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
    if (success) setSuccess(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError('All fields are required')
      return
    }
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords don't match")
      return
    }
    setLoading(true)
    try {
      await api.put('/auth/password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setSuccess(true)
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 1800)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-slate-800">Change Password</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-3 py-2.5 bg-teal-50 border border-teal-200 rounded-xl text-teal-700 text-sm">
            Password updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {field === 'newPassword' && (
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Profile() {
  const { user } = useAuth()
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const memberSince = user?.createdAt ? formatDate(user.createdAt) : '—'

  return (
    <div className="max-w-xl space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">{getInitials(user?.name)}</span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-slate-800">{user?.name}</h2>
            <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-center sm:justify-start">
              <User size={12} /> Member since {memberSince}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Account Settings</h3>
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <p className="text-sm font-medium text-slate-700">Password</p>
            <p className="text-xs text-slate-400 mt-0.5">Update your account password</p>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
          >
            Change
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-slate-700">Email</p>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">Primary</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">About SmartExpense</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          SmartExpense helps you track your income and expenses with automated insights. Log your transactions,
          visualize your spending patterns, and get personalized tips to improve your financial habits.
        </p>
      </div>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  )
}
