import { CATEGORY_COLORS, CHART_COLORS } from '../assets/colors.js'

export function buildPieChartData(distribution) {
  const labels = distribution.map((d) => d.category)
  const data = distribution.map((d) => d.total)
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: CATEGORY_COLORS.slice(0, labels.length),
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  }
}

export function buildLineChartData(sixMonthsData) {
  return {
    labels: sixMonthsData.map((d) => d.month),
    datasets: [
      {
        label: 'Income',
        data: sixMonthsData.map((d) => d.income),
        borderColor: CHART_COLORS.incomeLine,
        backgroundColor: CHART_COLORS.incomeArea,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS.incomeLine,
      },
      {
        label: 'Expenses',
        data: sixMonthsData.map((d) => d.expense),
        borderColor: CHART_COLORS.expenseLine,
        backgroundColor: CHART_COLORS.expenseArea,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS.expenseLine,
      },
    ],
  }
}

export function buildBarChartData(sixMonthsData, type = 'both') {
  const datasets = []
  if (type === 'both' || type === 'income') {
    datasets.push({
      label: 'Income',
      data: sixMonthsData.map((d) => d.income),
      backgroundColor: 'rgba(13, 148, 136, 0.8)',
      borderRadius: 6,
    })
  }
  if (type === 'both' || type === 'expense') {
    datasets.push({
      label: 'Expenses',
      data: sixMonthsData.map((d) => d.expense),
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      borderRadius: 6,
    })
  }
  return {
    labels: sixMonthsData.map((d) => d.month),
    datasets,
  }
}

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { callback: (v) => '₹' + v.toLocaleString('en-IN') },
    },
    x: { grid: { display: false } },
  },
}

export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { callback: (v) => '₹' + v.toLocaleString('en-IN') },
    },
    x: { grid: { display: false } },
  },
}

export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 12 } },
  },
}
