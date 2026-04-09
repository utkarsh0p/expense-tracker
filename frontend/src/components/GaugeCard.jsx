import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { formatCurrency } from '../utils/helpers.js'

ChartJS.register(ArcElement, Tooltip)

export default function GaugeCard({ label, value, maxValue, colors, subtitle }) {
  const safeMax = maxValue > 0 ? maxValue : 1
  const filled = Math.min(Math.abs(value), safeMax)
  const empty = safeMax - filled
  const percentage = maxValue > 0 ? Math.round((Math.abs(value) / maxValue) * 100) : 0
  const isNegative = value < 0

  const data = {
    datasets: [
      {
        data: [filled, empty],
        backgroundColor: [isNegative ? '#ef4444' : colors.fill, colors.empty],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '78%',
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    animation: { duration: 600 },
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col items-center hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-slate-500 mb-2">{label}</p>

      <div className="relative w-36 h-20">
        <Doughnut data={data} options={options} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span
            className="text-lg font-bold"
            style={{ color: isNegative ? '#ef4444' : colors.fill }}
          >
            {percentage}%
          </span>
        </div>
      </div>

      <p
        className="text-2xl font-bold mt-2"
        style={{ color: isNegative ? '#ef4444' : colors.fill }}
      >
        {formatCurrency(Math.abs(value))}
      </p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  )
}
