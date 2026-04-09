import { useLocation } from 'react-router-dom'
import { Menu, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { getInitials } from '../utils/helpers.js'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/income': 'Income',
  '/expenses': 'Expenses',
  '/profile': 'Profile',
}

export default function Navbar({ onMenuOpen }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || 'SmartExpense'

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">{getInitials(user?.name)}</span>
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
          title="Sign out"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  )
}
