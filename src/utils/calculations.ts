export interface AmortizationRow {
  month: number
  emi: number
  principal: number
  interest: number
  balance: number
}

export interface EMIResult {
  emi: number
  totalInterest: number
  totalPayment: number
  amortization: AmortizationRow[]
}

export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): EMIResult {
  const r = annualRate / 12 / 100
  if (r === 0) {
    const emi = principal / tenureMonths
    const amortization: AmortizationRow[] = []
    let balance = principal
    for (let m = 1; m <= tenureMonths; m++) {
      balance -= emi
      amortization.push({ month: m, emi: round(emi), principal: round(emi), interest: 0, balance: round(Math.max(0, balance)) })
    }
    return { emi: round(emi), totalInterest: 0, totalPayment: round(principal), amortization }
  }
  const emi = principal * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1)
  const amortization: AmortizationRow[] = []
  let balance = principal
  let totalInterest = 0
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * r
    const princ = emi - interest
    balance -= princ
    totalInterest += interest
    amortization.push({
      month: m,
      emi: round(emi),
      principal: round(princ),
      interest: round(interest),
      balance: round(Math.max(0, balance)),
    })
  }
  return { emi: round(emi), totalInterest: round(totalInterest), totalPayment: round(emi * tenureMonths), amortization }
}

export interface YearlyBreakdown {
  year: number
  invested: number
  returns: number
  total: number
}

export interface SIPResult {
  investedAmount: number
  estimatedReturns: number
  totalValue: number
  yearlyBreakdown: YearlyBreakdown[]
}

export function calculateSIP(monthlyInvestment: number, expectedReturnRate: number, years: number): SIPResult {
  const r = expectedReturnRate / 12 / 100
  const yearlyBreakdown: YearlyBreakdown[] = []
  let totalValue = 0
  for (let y = 1; y <= years; y++) {
    const n = y * 12
    if (r === 0) {
      totalValue = monthlyInvestment * n
    } else {
      totalValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    }
    const invested = monthlyInvestment * n
    yearlyBreakdown.push({ year: y, invested: round(invested), returns: round(totalValue - invested), total: round(totalValue) })
  }
  const investedAmount = monthlyInvestment * years * 12
  return {
    investedAmount: round(investedAmount),
    estimatedReturns: round(totalValue - investedAmount),
    totalValue: round(totalValue),
    yearlyBreakdown,
  }
}

export interface SWPResult {
  totalWithdrawn: number
  finalValue: number
  yearlyBreakdown: { year: number; withdrawal: number; balance: number }[]
}

export function calculateSWP(totalInvestment: number, monthlyWithdrawal: number, expectedReturnRate: number, years: number): SWPResult {
  const r = expectedReturnRate / 12 / 100
  let balance = totalInvestment
  let totalWithdrawn = 0
  const yearlyBreakdown: { year: number; withdrawal: number; balance: number }[] = []
  for (let y = 1; y <= years; y++) {
    let yearWithdrawal = 0
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) - monthlyWithdrawal
      yearWithdrawal += monthlyWithdrawal
      if (balance <= 0) { balance = 0; break }
    }
    totalWithdrawn += yearWithdrawal
    yearlyBreakdown.push({ year: y, withdrawal: round(yearWithdrawal), balance: round(balance) })
    if (balance <= 0) break
  }
  return { totalWithdrawn: round(totalWithdrawn), finalValue: round(Math.max(0, balance)), yearlyBreakdown }
}

export interface LumpsumResult {
  investedAmount: number
  estimatedReturns: number
  totalValue: number
  yearlyBreakdown: YearlyBreakdown[]
}

export function calculateLumpsum(investment: number, expectedReturnRate: number, years: number): LumpsumResult {
  const r = expectedReturnRate / 100
  const yearlyBreakdown: YearlyBreakdown[] = []
  for (let y = 1; y <= years; y++) {
    const total = investment * Math.pow(1 + r, y)
    yearlyBreakdown.push({ year: y, invested: round(investment), returns: round(total - investment), total: round(total) })
  }
  const totalValue = investment * Math.pow(1 + r, years)
  return {
    investedAmount: round(investment),
    estimatedReturns: round(totalValue - investment),
    totalValue: round(totalValue),
    yearlyBreakdown,
  }
}

export interface FDResult {
  maturityAmount: number
  totalInterest: number
  yearlyBreakdown: { year: number; principal: number; interest: number; total: number }[]
}

export function calculateFD(principal: number, annualRate: number, years: number, compoundingFrequency: number = 4): FDResult {
  const r = annualRate / 100
  const yearlyBreakdown: { year: number; principal: number; interest: number; total: number }[] = []
  for (let y = 1; y <= years; y++) {
    const total = principal * Math.pow(1 + r / compoundingFrequency, compoundingFrequency * y)
    yearlyBreakdown.push({ year: y, principal: round(principal), interest: round(total - principal), total: round(total) })
  }
  const maturityAmount = principal * Math.pow(1 + r / compoundingFrequency, compoundingFrequency * years)
  return { maturityAmount: round(maturityAmount), totalInterest: round(maturityAmount - principal), yearlyBreakdown }
}

export interface RDResult {
  maturityAmount: number
  totalDeposited: number
  totalInterest: number
  yearlyBreakdown: { year: number; deposited: number; interest: number; total: number }[]
}

export function calculateRD(monthlyDeposit: number, annualRate: number, years: number): RDResult {
  const r = annualRate / 100
  const n = 4
  const totalMonths = years * 12
  let maturityAmount = 0
  const yearlyBreakdown: { year: number; deposited: number; interest: number; total: number }[] = []
  for (let m = 1; m <= totalMonths; m++) {
    const remainingQuarters = ((totalMonths - m + 1) * n) / 12
    maturityAmount += monthlyDeposit * Math.pow(1 + r / n, remainingQuarters)
  }
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    let total = 0
    for (let m = 1; m <= months; m++) {
      const remainingQuarters = ((months - m + 1) * n) / 12
      total += monthlyDeposit * Math.pow(1 + r / n, remainingQuarters)
    }
    const deposited = monthlyDeposit * months
    yearlyBreakdown.push({ year: y, deposited: round(deposited), interest: round(total - deposited), total: round(total) })
  }
  const totalDeposited = monthlyDeposit * totalMonths
  return { maturityAmount: round(maturityAmount), totalDeposited: round(totalDeposited), totalInterest: round(maturityAmount - totalDeposited), yearlyBreakdown }
}

export interface PPFResult {
  maturityAmount: number
  totalDeposited: number
  totalInterest: number
  yearlyBreakdown: { year: number; deposit: number; interest: number; balance: number }[]
}

export function calculatePPF(yearlyDeposit: number, years: number = 15, rate: number = 7.1): PPFResult {
  const r = rate / 100
  let balance = 0
  let totalDeposited = 0
  const yearlyBreakdown: { year: number; deposit: number; interest: number; balance: number }[] = []
  for (let y = 1; y <= years; y++) {
    balance += yearlyDeposit
    const interest = balance * r
    balance += interest
    totalDeposited += yearlyDeposit
    yearlyBreakdown.push({ year: y, deposit: round(yearlyDeposit), interest: round(interest), balance: round(balance) })
  }
  return { maturityAmount: round(balance), totalDeposited: round(totalDeposited), totalInterest: round(balance - totalDeposited), yearlyBreakdown }
}

export interface EPFResult {
  totalBalance: number
  employeeTotal: number
  employerTotal: number
  interestEarned: number
  yearlyBreakdown: { year: number; salary: number; employeeContrib: number; employerContrib: number; interest: number; balance: number }[]
}

export function calculateEPF(
  basicSalary: number,
  employeeContributionPct: number = 12,
  employerContributionPct: number = 3.67,
  currentBalance: number = 0,
  yearsToRetirement: number = 30,
  salaryIncrement: number = 5,
  epfRate: number = 8.25,
): EPFResult {
  const r = epfRate / 100
  let balance = currentBalance
  let salary = basicSalary
  let employeeTotal = 0
  let employerTotal = 0
  const yearlyBreakdown: EPFResult['yearlyBreakdown'] = []
  for (let y = 1; y <= yearsToRetirement; y++) {
    const empContrib = salary * 12 * (employeeContributionPct / 100)
    const erContrib = salary * 12 * (employerContributionPct / 100)
    balance += empContrib + erContrib
    const interest = balance * r
    balance += interest
    employeeTotal += empContrib
    employerTotal += erContrib
    yearlyBreakdown.push({
      year: y,
      salary: round(salary),
      employeeContrib: round(empContrib),
      employerContrib: round(erContrib),
      interest: round(interest),
      balance: round(balance),
    })
    salary *= 1 + salaryIncrement / 100
  }
  return {
    totalBalance: round(balance),
    employeeTotal: round(employeeTotal),
    employerTotal: round(employerTotal),
    interestEarned: round(balance - employeeTotal - employerTotal - currentBalance),
    yearlyBreakdown,
  }
}

export interface NPSResult {
  totalInvested: number
  totalCorpus: number
  pensionWealth: number
  annuityInvestment: number
  estimatedPension: number
  yearlyBreakdown: { year: number; age: number; invested: number; corpus: number }[]
}

export function calculateNPS(
  monthlyContribution: number,
  expectedReturnRate: number,
  currentAge: number,
  retirementAge: number = 60,
  annuityRate: number = 6,
): NPSResult {
  const years = retirementAge - currentAge
  const r = expectedReturnRate / 12 / 100
  const yearlyBreakdown: NPSResult['yearlyBreakdown'] = []
  let corpus = 0
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      corpus = (corpus + monthlyContribution) * (1 + r)
    }
    yearlyBreakdown.push({
      year: y,
      age: currentAge + y,
      invested: round(monthlyContribution * 12 * y),
      corpus: round(corpus),
    })
  }
  const totalInvested = monthlyContribution * 12 * years
  const annuityInvestment = corpus * 0.4
  const pensionWealth = corpus * 0.6
  const estimatedPension = (annuityInvestment * (annuityRate / 100)) / 12
  return {
    totalInvested: round(totalInvested),
    totalCorpus: round(corpus),
    pensionWealth: round(pensionWealth),
    annuityInvestment: round(annuityInvestment),
    estimatedPension: round(estimatedPension),
    yearlyBreakdown,
  }
}

export interface GratuityResult {
  gratuityAmount: number
}

export function calculateGratuity(lastDrawnSalary: number, yearsOfService: number): GratuityResult {
  const gratuity = (15 * lastDrawnSalary * yearsOfService) / 26
  return { gratuityAmount: round(gratuity) }
}

export interface HRAResult {
  exemptedHRA: number
  taxableHRA: number
  actualHRA: number
  rule1: number
  rule2: number
  rule3: number
}

export function calculateHRA(basicSalary: number, hra: number, rentPaid: number, isMetro: boolean): HRAResult {
  const annualBasic = basicSalary * 12
  const annualHRA = hra * 12
  const annualRent = rentPaid * 12
  const rule1 = annualHRA
  const rule2 = annualRent - 0.1 * annualBasic
  const rule3 = (isMetro ? 0.5 : 0.4) * annualBasic
  const exempted = Math.max(0, Math.min(rule1, rule2, rule3))
  return {
    exemptedHRA: round(exempted),
    taxableHRA: round(annualHRA - exempted),
    actualHRA: round(annualHRA),
    rule1: round(rule1),
    rule2: round(rule2),
    rule3: round(rule3),
  }
}

export interface RentVsBuyResult {
  buyCost: number
  rentCost: number
  yearlyComparison: { year: number; buyCumulative: number; rentCumulative: number; propertyValue: number }[]
  recommendation: string
}

export function calculateRentVsBuy(
  propertyPrice: number,
  downPayment: number,
  loanRate: number,
  loanTenureYears: number,
  monthlyRent: number,
  rentIncrease: number = 5,
  propertyAppreciation: number = 5,
  investmentReturn: number = 10,
): RentVsBuyResult {
  const loanAmount = propertyPrice - downPayment
  const emiResult = calculateEMI(loanAmount, loanRate, loanTenureYears * 12)
  const totalYears = Math.max(loanTenureYears, 20)
  let buyCumulative = downPayment
  let rentCumulative = 0
  let rent = monthlyRent
  let investmentCorpus = 0
  const yearlyComparison: RentVsBuyResult['yearlyComparison']  = []
  for (let y = 1; y <= totalYears; y++) {
    if (y <= loanTenureYears) {
      buyCumulative += emiResult.emi * 12
    }
    buyCumulative += propertyPrice * 0.01
    rentCumulative += rent * 12
    const diff = (y <= loanTenureYears ? emiResult.emi : 0) + propertyPrice * 0.01 / 12 - rent
    if (diff < 0) {
      investmentCorpus = (investmentCorpus - diff * 12) * (1 + investmentReturn / 100)
    }
    rent *= 1 + rentIncrease / 100
    const propertyValue = propertyPrice * Math.pow(1 + propertyAppreciation / 100, y)
    yearlyComparison.push({
      year: y,
      buyCumulative: round(buyCumulative),
      rentCumulative: round(rentCumulative),
      propertyValue: round(propertyValue),
    })
  }
  const finalPropertyValue = propertyPrice * Math.pow(1 + propertyAppreciation / 100, totalYears)
  const netBuyCost = buyCumulative - finalPropertyValue
  const netRentCost = rentCumulative - investmentCorpus
  const recommendation = netBuyCost < netRentCost ? 'Buying is more economical in the long run.' : 'Renting and investing the difference is more economical.'
  return { buyCost: round(netBuyCost), rentCost: round(netRentCost), yearlyComparison, recommendation }
}

export interface CAGRResult {
  cagr: number
}

export function calculateCAGR(initialValue: number, finalValue: number, years: number): CAGRResult {
  if (initialValue <= 0 || years <= 0) return { cagr: 0 }
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
  return { cagr: round(cagr) }
}

export interface InflationResult {
  futureCost: number
  yearlyBreakdown: { year: number; cost: number }[]
}

export function calculateInflation(currentCost: number, inflationRate: number, years: number): InflationResult {
  const yearlyBreakdown: { year: number; cost: number }[] = []
  for (let y = 1; y <= years; y++) {
    yearlyBreakdown.push({ year: y, cost: round(currentCost * Math.pow(1 + inflationRate / 100, y)) })
  }
  return { futureCost: round(currentCost * Math.pow(1 + inflationRate / 100, years)), yearlyBreakdown }
}

export interface GSTResult {
  baseAmount: number
  gstAmount: number
  totalAmount: number
  cgst: number
  sgst: number
}

export function calculateGST(amount: number, gstRate: number, isInclusive: boolean = false): GSTResult {
  let baseAmount: number, gstAmount: number, totalAmount: number
  if (isInclusive) {
    baseAmount = amount / (1 + gstRate / 100)
    gstAmount = amount - baseAmount
    totalAmount = amount
  } else {
    baseAmount = amount
    gstAmount = amount * (gstRate / 100)
    totalAmount = amount + gstAmount
  }
  return {
    baseAmount: round(baseAmount),
    gstAmount: round(gstAmount),
    totalAmount: round(totalAmount),
    cgst: round(gstAmount / 2),
    sgst: round(gstAmount / 2),
  }
}

export interface StampDutyResult {
  stampDuty: number
  registrationCharges: number
  totalCost: number
  stampDutyRate: number
  registrationRate: number
}

const stampDutyRates: Record<string, { stampDuty: number; registration: number }> = {
  maharashtra: { stampDuty: 5, registration: 1 },
  karnataka: { stampDuty: 5, registration: 1 },
  delhi: { stampDuty: 6, registration: 1 },
  tamilnadu: { stampDuty: 7, registration: 4 },
}

export function calculateStampDuty(propertyValue: number, state: string): StampDutyResult {
  const rates = stampDutyRates[state.toLowerCase()] || { stampDuty: 5, registration: 1 }
  const stampDuty = propertyValue * rates.stampDuty / 100
  const registrationCharges = propertyValue * rates.registration / 100
  return {
    stampDuty: round(stampDuty),
    registrationCharges: round(registrationCharges),
    totalCost: round(propertyValue + stampDuty + registrationCharges),
    stampDutyRate: rates.stampDuty,
    registrationRate: rates.registration,
  }
}

export interface HomeLoanEligibilityResult {
  eligibleEMI: number
  eligibleLoanAmount: number
  maxPropertyValue: number
}

export function calculateHomeLoanEligibility(
  monthlyIncome: number,
  existingEMI: number = 0,
  loanRate: number = 8.5,
  tenureYears: number = 20,
  maxFOIR: number = 50,
): HomeLoanEligibilityResult {
  const eligibleEMI = monthlyIncome * (maxFOIR / 100) - existingEMI
  const r = loanRate / 12 / 100
  const n = tenureYears * 12
  let eligibleLoanAmount: number
  if (r === 0) {
    eligibleLoanAmount = eligibleEMI * n
  } else {
    eligibleLoanAmount = eligibleEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
  }
  const maxPropertyValue = eligibleLoanAmount / 0.8
  return {
    eligibleEMI: round(Math.max(0, eligibleEMI)),
    eligibleLoanAmount: round(Math.max(0, eligibleLoanAmount)),
    maxPropertyValue: round(Math.max(0, maxPropertyValue)),
  }
}

export interface EducationLoanResult {
  emi: number
  totalInterest: number
  totalPayment: number
  amortization: AmortizationRow[]
}

export function calculateEducationLoan(
  loanAmount: number,
  interestRate: number,
  moratoriumMonths: number,
  repaymentYears: number,
): EducationLoanResult {
  const r = interestRate / 12 / 100
  let accruedBalance = loanAmount
  for (let m = 0; m < moratoriumMonths; m++) {
    accruedBalance *= 1 + r
  }
  const result = calculateEMI(accruedBalance, interestRate, repaymentYears * 12)
  return {
    emi: result.emi,
    totalInterest: round(result.totalPayment - loanAmount),
    totalPayment: result.totalPayment,
    amortization: result.amortization,
  }
}

export interface RetirementResult {
  corpusRequired: number
  monthlySavingsNeeded: number
  yearlyBreakdown: { year: number; age: number; expenses: number; savings: number; corpus: number }[]
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  monthlyExpenses: number,
  inflationRate: number = 6,
  expectedReturn: number = 12,
  currentSavings: number = 0,
): RetirementResult {
  const yearsToRetirement = retirementAge - currentAge
  const yearsInRetirement = 85 - retirementAge
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement)
  const futureAnnualExpenses = futureMonthlyExpenses * 12
  const realReturnInRetirement = ((1 + expectedReturn / 100 * 0.5) / (1 + inflationRate / 100)) - 1
  let corpusRequired: number
  if (realReturnInRetirement <= 0) {
    corpusRequired = futureAnnualExpenses * yearsInRetirement
  } else {
    corpusRequired = futureAnnualExpenses * (1 - Math.pow(1 + realReturnInRetirement, -yearsInRetirement)) / realReturnInRetirement
  }
  const r = expectedReturn / 12 / 100
  const n = yearsToRetirement * 12
  const fvCurrentSavings = currentSavings * Math.pow(1 + r, n)
  const corpusGap = Math.max(0, corpusRequired - fvCurrentSavings)
  let monthlySavingsNeeded: number
  if (r === 0) {
    monthlySavingsNeeded = corpusGap / n
  } else {
    monthlySavingsNeeded = corpusGap * r / (Math.pow(1 + r, n) - 1)
  }
  const yearlyBreakdown: RetirementResult['yearlyBreakdown'] = []
  let corpus = currentSavings
  let expenses = monthlyExpenses * 12
  for (let y = 1; y <= yearsToRetirement; y++) {
    corpus = (corpus + monthlySavingsNeeded * 12) * (1 + expectedReturn / 100)
    expenses *= 1 + inflationRate / 100
    yearlyBreakdown.push({
      year: y,
      age: currentAge + y,
      expenses: round(expenses),
      savings: round(monthlySavingsNeeded * 12),
      corpus: round(corpus),
    })
  }
  return { corpusRequired: round(corpusRequired), monthlySavingsNeeded: round(Math.max(0, monthlySavingsNeeded)), yearlyBreakdown }
}

export interface FIREResult {
  fireNumber: number
  yearsToFire: number
  yearlyBreakdown: { year: number; savings: number; investmentGrowth: number; corpus: number; targetExpenses: number }[]
}

export function calculateFIRE(
  annualExpenses: number,
  currentSavings: number,
  annualSavings: number,
  investmentReturn: number = 8,
  withdrawalRate: number = 4,
  inflationRate: number = 6,
): FIREResult {
  const fireNumber = annualExpenses * Math.pow(1 + inflationRate / 100, 0) / (withdrawalRate / 100)
  const yearlyBreakdown: FIREResult['yearlyBreakdown'] = []
  let corpus = currentSavings
  let yearsToFire = 0
  let expenses = annualExpenses
  for (let y = 1; y <= 60; y++) {
    const growth = corpus * (investmentReturn / 100)
    corpus = corpus + growth + annualSavings
    expenses *= 1 + inflationRate / 100
    const currentFireNumber = expenses / (withdrawalRate / 100)
    yearlyBreakdown.push({
      year: y,
      savings: round(annualSavings),
      investmentGrowth: round(growth),
      corpus: round(corpus),
      targetExpenses: round(expenses),
    })
    if (corpus >= currentFireNumber && yearsToFire === 0) {
      yearsToFire = y
    }
  }
  if (yearsToFire === 0) yearsToFire = -1
  return { fireNumber: round(fireNumber), yearsToFire, yearlyBreakdown }
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}
