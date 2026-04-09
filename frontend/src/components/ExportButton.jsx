import { useState } from 'react'
import { Download } from 'lucide-react'
import api from '../utils/api.js'

export default function ExportButton({ endpoint, filename, params, color = 'teal' }) {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const res = await api.get(endpoint, { params, responseType: 'blob' })
      const url = URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = filename || 'export.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const colorClass = color === 'orange'
    ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
    : 'border-teal-200 text-teal-600 hover:bg-teal-50'

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-sm font-medium transition-colors disabled:opacity-60 ${colorClass}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <Download size={15} />
      )}
      Export CSV
    </button>
  )
}
