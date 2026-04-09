export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function toInputDate(dateStr) {
  return new Date(dateStr).toISOString().split('T')[0]
}

export function toIsoWithClientTime(dateStr) {
  const [year, month, day] = dateStr.split('-')
  const now = new Date()
  return new Date(year, month - 1, day, now.getHours(), now.getMinutes()).toISOString()
}

export function todayInputValue() {
  return new Date().toISOString().split('T')[0]
}

export function safeArray(response) {
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.data?.data)) return response.data.data
  return []
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function getTimeFrameLabel(range) {
  const labels = { day: 'Today', week: 'This Week', month: 'This Month', year: 'This Year', all: 'All Time' }
  return labels[range] || 'This Month'
}
