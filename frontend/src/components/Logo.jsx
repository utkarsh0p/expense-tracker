import { Wallet } from 'lucide-react'

const sizes = {
  sm: { iconSize: 13, box: 'w-7 h-7', text: 'text-lg', radius: 'rounded-lg' },
  md: { iconSize: 15, box: 'w-8 h-8', text: 'text-xl', radius: 'rounded-xl' },
  lg: { iconSize: 19, box: 'w-10 h-10', text: 'text-3xl', radius: 'rounded-xl' },
}

export default function Logo({ size = 'md', dark = false, iconOnly = false }) {
  const s = sizes[size]
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${s.box} ${s.radius} flex items-center justify-center flex-shrink-0 shadow-md`}
        style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)' }}
      >
        <Wallet size={s.iconSize} className="text-white" strokeWidth={2} />
      </div>
      {!iconOnly && (
        <span className={`${s.text} font-bold tracking-tight leading-none`}>
          <span className={dark ? 'text-white' : 'text-slate-800'}>Smart</span>
          <span style={{ color: '#14b8a6' }}>Expense</span>
        </span>
      )}
    </div>
  )
}
