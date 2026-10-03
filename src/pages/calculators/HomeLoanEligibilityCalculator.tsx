import { useState } from 'react'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import { calculateHomeLoanEligibility } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function HomeLoanEligibilityCalculator() {
  const [income, setIncome] = useState(100000)
  const [existingEMI, setExistingEMI] = useState(0)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [foir, setFoir] = useState(50)

  const result = calculateHomeLoanEligibility(income, existingEMI, rate, tenure, foir)

  return (
    <CalculatorLayout title="Home Loan Eligibility Calculator" description="Check how much home loan you are eligible for based on your income and existing EMIs." path="/home-loan-eligibility-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Home Loan Eligibility Calculator', url: 'https://calc.doaide.com/home-loan-eligibility-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Monthly Income" value={income} onChange={setIncome} min={10000} max={1000000} step={5000} prefix="₹" />
          <SliderInput label="Existing EMIs" value={existingEMI} onChange={setExistingEMI} min={0} max={500000} step={1000} prefix="₹" />
          <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={5} max={15} step={0.25} suffix="%" />
          <SliderInput label="Loan Tenure" value={tenure} onChange={setTenure} min={5} max={30} step={1} suffix=" years" />
          <SliderInput label="FOIR (Fixed Obligation to Income Ratio)" value={foir} onChange={setFoir} min={30} max={70} step={5} suffix="%" />
        </div>
        <div>
          <div style={{ display: 'grid', gap: 12 }}>
            <ResultCard label="Eligible EMI" value={formatIndianCurrency(result.eligibleEMI)} color="#F0B429" subtitle="Maximum EMI you can afford" />
            <ResultCard label="Eligible Loan Amount" value={formatIndianCurrency(result.eligibleLoanAmount)} color="#48BB78" subtitle={formatCompact(result.eligibleLoanAmount)} />
            <ResultCard label="Max Property Value" value={formatIndianCurrency(result.maxPropertyValue)} color="#9F7AEA" subtitle="Assuming 80% LTV ratio" />
          </div>
        </div>
      </div>
      <ShareButtons title="Home Loan Eligibility" text={`Eligible for home loan up to ${formatIndianCurrency(result.eligibleLoanAmount)}`} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
