const OPTIONS = ['day', 'week', 'month', 'year']

const ACTIVE_CLASSES = {
  teal: 'bg-teal-600 text-white',
  orange: 'bg-orange-500 text-white',
  cyan: 'bg-cyan-500 text-white',
}

export default function TimeFrameSelector({ value, onChange, color = 'teal' }) {
  return (
    <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors
            ${value === opt ? ACTIVE_CLASSES[color] : 'text-slate-500 hover:text-slate-700 hover:bg-white'}
          `}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
