import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, PieChart, Star, Receipt } from 'lucide-react'
import { INSIGHT_COLORS } from '../assets/colors.js'

const ICONS = {
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  alert: AlertCircle,
  lightbulb: Lightbulb,
  pie: PieChart,
  star: Star,
  receipt: Receipt,
}

export default function InsightCard({ insight }) {
  const { type, headline, detail, icon } = insight
  const colors = INSIGHT_COLORS[type] || INSIGHT_COLORS.tip
  const Icon = ICONS[icon] || Lightbulb

  return (
    <div
      className="flex gap-3 rounded-2xl border p-4 overflow-hidden relative"
      style={{ backgroundColor: colors.bg, borderColor: colors.bar + '33' }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ backgroundColor: colors.bar }}
      />

      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ml-1"
        style={{ backgroundColor: colors.bar + '20' }}
      >
        <Icon size={16} style={{ color: colors.bar }} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800 leading-snug">{headline}</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{detail}</p>
      </div>
    </div>
  )
}
