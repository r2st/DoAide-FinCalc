export function formatIndianCurrency(num: number): string {
  if (num < 0) return '-' + formatIndianCurrency(-num)
  const fixed = Math.round(num * 100) / 100
  const [intPart, decPart] = fixed.toString().split('.')
  const lastThree = intPart.slice(-3)
  const rest = intPart.slice(0, -3)
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (rest ? ',' : '') + lastThree
  return '₹' + formatted + (decPart ? '.' + decPart.padEnd(2, '0') : '')
}

export function formatNumber(num: number): string {
  if (num < 0) return '-' + formatNumber(-num)
  const fixed = Math.round(num * 100) / 100
  const [intPart, decPart] = fixed.toString().split('.')
  const lastThree = intPart.slice(-3)
  const rest = intPart.slice(0, -3)
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (rest ? ',' : '') + lastThree
  return formatted + (decPart ? '.' + decPart : '')
}

export function formatPercent(num: number): string {
  return (Math.round(num * 100) / 100).toFixed(2) + '%'
}

export function formatCompact(num: number): string {
  if (num >= 1e7) return '₹' + (num / 1e7).toFixed(2) + ' Cr'
  if (num >= 1e5) return '₹' + (num / 1e5).toFixed(2) + ' L'
  if (num >= 1e3) return '₹' + (num / 1e3).toFixed(1) + ' K'
  return '₹' + num.toFixed(0)
}
