import { describe, it, expect } from 'vitest'
import { formatIndianCurrency, formatNumber, formatPercent, formatCompact } from '../utils/format'

describe('formatIndianCurrency', () => {
  it('formats small numbers', () => {
    expect(formatIndianCurrency(1000)).toBe('₹1,000')
  })

  it('formats lakhs with Indian commas', () => {
    expect(formatIndianCurrency(1000000)).toBe('₹10,00,000')
  })

  it('formats crores', () => {
    expect(formatIndianCurrency(10000000)).toBe('₹1,00,00,000')
  })
})

describe('formatNumber', () => {
  it('formats with Indian commas', () => {
    expect(formatNumber(1000000)).toBe('10,00,000')
  })
})

describe('formatPercent', () => {
  it('formats percentage', () => {
    expect(formatPercent(8.5)).toBe('8.50%')
  })
})

describe('formatCompact', () => {
  it('formats crores', () => {
    expect(formatCompact(50000000)).toBe('₹5.00 Cr')
  })

  it('formats lakhs', () => {
    expect(formatCompact(500000)).toBe('₹5.00 L')
  })

  it('formats thousands', () => {
    expect(formatCompact(5000)).toBe('₹5.0 K')
  })
})
