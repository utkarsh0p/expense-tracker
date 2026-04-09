import { NavLink } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, TrendingDown, User, X, ChevronLeft, ChevronRight } from 'lucide-react'

const MENU = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Income', path: '/income', icon: TrendingUp },
  { label: 'Expenses', path: '/expenses', icon: TrendingDown },
  { label: 'Profile', path: '/profile', icon: User },
]

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-slate-900 text-white z-50 flex flex-col
          transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${collapsed ? 'md:w-16' : 'md:w-60'}
          w-60
        `}
      >
        <div className={`flex items-center h-16 px-4 border-b border-slate-700/50 ${collapsed ? 'md:justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp size={14} className="text-white" />
              </div>
              <span className="brand-font text-xl text-white">SmartExpense</span>
            </div>
          )}
          {collapsed && (
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
          )}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {MENU.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-colors mb-0.5
                ${isActive
                  ? 'bg-teal-600/20 text-teal-400 border border-teal-600/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
                ${collapsed ? 'md:justify-center md:px-2' : ''}
                `
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="md:block">{label}</span>}
              <span className={`md:hidden ${collapsed ? '' : 'hidden'}`}>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center h-12 border-t border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>
    </>
  )
}
