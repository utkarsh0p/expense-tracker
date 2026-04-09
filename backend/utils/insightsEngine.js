const SAVING_TIPS = {
  Food: 'Meal prepping on Sundays can cut your food costs by up to 25%.',
  Shopping: 'Try a 48-hour rule before non-essential purchases — it reduces impulse buying significantly.',
  Bills: 'Review your subscriptions. Unused services add up quietly over time.',
  Travel: 'Booking transport a week in advance typically saves 15–20% on average.',
  Health: 'Preventive check-ups tend to cost far less than reactive treatments.',
  Entertainment: 'Look for free or discounted local events — many great experiences cost nothing.',
  Education: 'Libraries and open-source platforms offer quality learning resources for free.',
  Other: 'Tracking every purchase, even small ones, reveals where money quietly slips away.',
}

export function generateInsights(currentExpenses, prevExpenses, monthlyIncome, monthlyExpense) {
  const insights = []

  const currentTotal = monthlyExpense
  const prevTotal = prevExpenses.reduce((sum, e) => sum + e.amount, 0)

  const categoryMap = {}
  currentExpenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount
  })

  const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])

  if (currentTotal > 0 && sortedCategories.length > 0) {
    const [topCat, topAmount] = sortedCategories[0]
    const percentage = Math.round((topAmount / currentTotal) * 100)
    if (percentage >= 30) {
      insights.push({
        type: 'pattern',
        headline: `${percentage}% of your spending went to ${topCat}`,
        detail: `You spent ₹${topAmount.toFixed(0)} on ${topCat} this month — your largest category.`,
        icon: 'pie',
      })
    }
  }

  if (prevTotal > 0) {
    const delta = ((currentTotal - prevTotal) / prevTotal) * 100
    if (delta > 10) {
      insights.push({
        type: 'warning',
        headline: `Spending is up ${Math.round(delta)}% from last month`,
        detail: `You spent ₹${currentTotal.toFixed(0)} this month vs ₹${prevTotal.toFixed(0)} last month.`,
        icon: 'trending-up',
      })
    } else if (delta < -10) {
      insights.push({
        type: 'positive',
        headline: `Spending is down ${Math.round(Math.abs(delta))}% from last month`,
        detail: `Great discipline — you spent ₹${Math.abs(currentTotal - prevTotal).toFixed(0)} less than last month.`,
        icon: 'trending-down',
      })
    }
  }

  if (monthlyIncome > 0) {
    const savingsRate = ((monthlyIncome - currentTotal) / monthlyIncome) * 100
    if (savingsRate < 0) {
      insights.push({
        type: 'danger',
        headline: "You're spending more than you earn this month",
        detail: `Your expenses exceed your income by ₹${Math.abs(monthlyIncome - currentTotal).toFixed(0)}.`,
        icon: 'alert',
      })
    } else if (savingsRate < 10) {
      insights.push({
        type: 'warning',
        headline: `Savings rate is only ${Math.round(savingsRate)}%`,
        detail: 'A healthy savings rate is 20% or more. Consider reviewing your Bills and Shopping.',
        icon: 'alert',
      })
    } else if (savingsRate > 30) {
      insights.push({
        type: 'positive',
        headline: `Excellent! You're saving ${Math.round(savingsRate)}% of your income`,
        detail: `You've saved ₹${(monthlyIncome - currentTotal).toFixed(0)} this month. Keep it up.`,
        icon: 'star',
      })
    }
  }

  if (sortedCategories.length > 0) {
    const topCat = sortedCategories[0][0]
    const tip = SAVING_TIPS[topCat] || SAVING_TIPS['Other']
    insights.push({
      type: 'tip',
      headline: `Tip for ${topCat}`,
      detail: tip,
      icon: 'lightbulb',
    })
  }

  const smallTxCount = currentExpenses.filter((e) => e.amount < 200).length
  if (smallTxCount > 15) {
    insights.push({
      type: 'pattern',
      headline: `${smallTxCount} small purchases this month`,
      detail: 'Frequent small transactions often add up more than expected. Worth reviewing.',
      icon: 'receipt',
    })
  }

  return insights
}
