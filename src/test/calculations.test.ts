import { describe, it, expect } from 'vitest'
import {
  calculateEMI, calculateSIP, calculateSWP, calculateLumpsum,
  calculateFD, calculateRD, calculatePPF, calculateEPF,
  calculateNPS, calculateGratuity, calculateHRA, calculateRentVsBuy,
  calculateCAGR, calculateInflation, calculateGST, calculateStampDuty,
  calculateHomeLoanEligibility, calculateEducationLoan,
  calculateRetirement, calculateFIRE,
} from '../utils/calculations'

describe('EMI Calculator', () => {
  it('calculates correct EMI for standard home loan', () => {
    const result = calculateEMI(3000000, 8.5, 240)
    expect(result.emi).toBeCloseTo(26034.7, 0)
    expect(result.totalPayment).toBeGreaterThan(3000000)
    expect(result.amortization).toHaveLength(240)
  })

  it('handles zero interest rate', () => {
    const result = calculateEMI(120000, 0, 12)
    expect(result.emi).toBe(10000)
    expect(result.totalInterest).toBe(0)
  })

  it('amortization last row has near-zero balance', () => {
    const result = calculateEMI(1000000, 10, 120)
    const last = result.amortization[result.amortization.length - 1]
    expect(last.balance).toBeLessThan(1)
  })
})

describe('SIP Calculator', () => {
  it('calculates correct SIP value', () => {
    const result = calculateSIP(10000, 12, 10)
    expect(result.investedAmount).toBe(1200000)
    expect(result.totalValue).toBeGreaterThan(1200000)
    expect(result.yearlyBreakdown).toHaveLength(10)
  })

  it('zero return gives back invested amount', () => {
    const result = calculateSIP(5000, 0, 5)
    expect(result.totalValue).toBe(300000)
    expect(result.estimatedReturns).toBe(0)
  })
})

describe('SWP Calculator', () => {
  it('depletes corpus over time', () => {
    const result = calculateSWP(1000000, 10000, 6, 20)
    expect(result.totalWithdrawn).toBeGreaterThan(0)
    expect(result.finalValue).toBeGreaterThanOrEqual(0)
  })

  it('high withdrawal depletes faster', () => {
    const r1 = calculateSWP(1000000, 10000, 8, 30)
    const r2 = calculateSWP(1000000, 50000, 8, 30)
    expect(r2.finalValue).toBeLessThanOrEqual(r1.finalValue)
  })
})

describe('Lumpsum Calculator', () => {
  it('doubles with rule of 72 approximately', () => {
    const result = calculateLumpsum(100000, 12, 6)
    expect(result.totalValue).toBeCloseTo(197382, -2)
  })

  it('yearly breakdown grows monotonically', () => {
    const result = calculateLumpsum(100000, 10, 5)
    for (let i = 1; i < result.yearlyBreakdown.length; i++) {
      expect(result.yearlyBreakdown[i].total).toBeGreaterThan(result.yearlyBreakdown[i - 1].total)
    }
  })
})

describe('FD Calculator', () => {
  it('calculates quarterly compounding correctly', () => {
    const result = calculateFD(100000, 7, 5)
    expect(result.maturityAmount).toBeCloseTo(141478, -1)
    expect(result.totalInterest).toBeCloseTo(41478, -1)
  })

  it('annual compounding gives less than quarterly', () => {
    const annual = calculateFD(100000, 7, 5, 1)
    const quarterly = calculateFD(100000, 7, 5, 4)
    expect(quarterly.maturityAmount).toBeGreaterThan(annual.maturityAmount)
  })
})

describe('RD Calculator', () => {
  it('returns more than total deposited', () => {
    const result = calculateRD(10000, 7, 5)
    expect(result.maturityAmount).toBeGreaterThan(result.totalDeposited)
    expect(result.totalDeposited).toBe(600000)
  })
})

describe('PPF Calculator', () => {
  it('calculates 15-year PPF at 7.1%', () => {
    const result = calculatePPF(150000, 15)
    expect(result.totalDeposited).toBe(2250000)
    expect(result.maturityAmount).toBeGreaterThan(2250000)
    expect(result.yearlyBreakdown).toHaveLength(15)
  })
})

describe('EPF Calculator', () => {
  it('accumulates with salary increments', () => {
    const result = calculateEPF(50000, 12, 3.67, 0, 30, 5)
    expect(result.totalBalance).toBeGreaterThan(result.employeeTotal + result.employerTotal)
    expect(result.yearlyBreakdown).toHaveLength(30)
  })
})

describe('NPS Calculator', () => {
  it('splits 60-40 correctly', () => {
    const result = calculateNPS(5000, 10, 30, 60)
    expect(result.pensionWealth).toBeCloseTo(result.totalCorpus * 0.6, 0)
    expect(result.annuityInvestment).toBeCloseTo(result.totalCorpus * 0.4, 0)
  })
})

describe('Gratuity Calculator', () => {
  it('applies correct formula: (15 * salary * years) / 26', () => {
    const result = calculateGratuity(80000, 10)
    expect(result.gratuityAmount).toBeCloseTo((15 * 80000 * 10) / 26, 0)
  })

  it('minimum 5 years', () => {
    const result = calculateGratuity(50000, 5)
    expect(result.gratuityAmount).toBeCloseTo((15 * 50000 * 5) / 26, 0)
  })
})

describe('HRA Calculator', () => {
  it('exempts minimum of 3 rules', () => {
    const result = calculateHRA(50000, 20000, 15000, true)
    const min = Math.min(result.rule1, result.rule2, result.rule3)
    expect(result.exemptedHRA).toBe(min)
  })

  it('metro gets 50% and non-metro gets 40%', () => {
    const metro = calculateHRA(50000, 20000, 15000, true)
    const nonMetro = calculateHRA(50000, 20000, 15000, false)
    expect(metro.rule3).toBe(50000 * 12 * 0.5)
    expect(nonMetro.rule3).toBe(50000 * 12 * 0.4)
  })
})

describe('Rent vs Buy Calculator', () => {
  it('returns a recommendation', () => {
    const result = calculateRentVsBuy(8000000, 1600000, 8.5, 20, 25000)
    expect(result.recommendation).toBeTruthy()
    expect(result.yearlyComparison.length).toBeGreaterThan(0)
  })
})

describe('CAGR Calculator', () => {
  it('calculates correct CAGR', () => {
    const result = calculateCAGR(100000, 200000, 5)
    expect(result.cagr).toBeCloseTo(14.87, 1)
  })

  it('handles same value (0% growth)', () => {
    const result = calculateCAGR(100000, 100000, 10)
    expect(result.cagr).toBe(0)
  })
})

describe('Inflation Calculator', () => {
  it('doubles at ~12 years at 6%', () => {
    const result = calculateInflation(100000, 6, 12)
    expect(result.futureCost).toBeCloseTo(201220, -2)
  })
})

describe('GST Calculator', () => {
  it('exclusive GST adds on top', () => {
    const result = calculateGST(10000, 18, false)
    expect(result.baseAmount).toBe(10000)
    expect(result.gstAmount).toBe(1800)
    expect(result.totalAmount).toBe(11800)
    expect(result.cgst).toBe(900)
    expect(result.sgst).toBe(900)
  })

  it('inclusive GST extracts from total', () => {
    const result = calculateGST(11800, 18, true)
    expect(result.baseAmount).toBeCloseTo(10000, 0)
    expect(result.gstAmount).toBeCloseTo(1800, 0)
  })
})

describe('Stamp Duty Calculator', () => {
  it('Maharashtra rates: 5% stamp duty, 1% registration', () => {
    const result = calculateStampDuty(10000000, 'maharashtra')
    expect(result.stampDuty).toBe(500000)
    expect(result.registrationCharges).toBe(100000)
    expect(result.totalCost).toBe(10600000)
  })

  it('Tamil Nadu has higher rates', () => {
    const mh = calculateStampDuty(10000000, 'maharashtra')
    const tn = calculateStampDuty(10000000, 'tamilnadu')
    expect(tn.stampDuty).toBeGreaterThan(mh.stampDuty)
  })
})

describe('Home Loan Eligibility', () => {
  it('calculates eligible amount', () => {
    const result = calculateHomeLoanEligibility(100000, 0, 8.5, 20, 50)
    expect(result.eligibleEMI).toBe(50000)
    expect(result.eligibleLoanAmount).toBeGreaterThan(0)
    expect(result.maxPropertyValue).toBeGreaterThan(result.eligibleLoanAmount)
  })
})

describe('Education Loan Calculator', () => {
  it('moratorium increases total cost', () => {
    const noMor = calculateEducationLoan(2000000, 9, 0, 10)
    const withMor = calculateEducationLoan(2000000, 9, 24, 10)
    expect(withMor.totalPayment).toBeGreaterThan(noMor.totalPayment)
  })
})

describe('Retirement Calculator', () => {
  it('calculates corpus and savings needed', () => {
    const result = calculateRetirement(30, 60, 50000, 6, 12, 0)
    expect(result.corpusRequired).toBeGreaterThan(0)
    expect(result.monthlySavingsNeeded).toBeGreaterThan(0)
    expect(result.yearlyBreakdown).toHaveLength(30)
  })
})

describe('FIRE Calculator', () => {
  it('calculates fire number correctly', () => {
    const result = calculateFIRE(600000, 0, 500000, 8, 4, 6)
    expect(result.fireNumber).toBe(600000 / 0.04)
    expect(result.yearsToFire).toBeGreaterThan(0)
  })

  it('already FIRE-d if savings exceed fire number', () => {
    const result = calculateFIRE(600000, 20000000, 500000, 8, 4, 6)
    expect(result.yearsToFire).toBe(1)
  })
})
