import { useState } from 'react'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import { calculateGratuity } from '../../utils/calculations'
import { formatIndianCurrency } from '../../utils/format'

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(80000)
  const [years, setYears] = useState(10)

  const result = calculateGratuity(salary, years)

  return (
    <CalculatorLayout title="Gratuity Calculator" description="Calculate gratuity amount based on your last drawn salary and years of service." path="/gratuity-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Gratuity Calculator', url: 'https://calc.doaide.com/gratuity-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Last Drawn Salary (Basic + DA)" value={salary} onChange={setSalary} min={5000} max={500000} step={1000} prefix="₹" />
          <SliderInput label="Years of Service" value={years} onChange={setYears} min={5} max={40} step={1} suffix=" years" />
          <div style={{ padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginTop: 16 }}>
            <h3 style={{ fontSize: 14, color: 'var(--gold)', marginBottom: 8 }}>Gratuity Formula</h3>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Gratuity = (15 &times; Last Drawn Salary &times; Years of Service) / 26<br />
              Applicable for employees who have completed 5+ years of service under the Payment of Gratuity Act, 1972.
            </p>
          </div>
        </div>
        <div>
          <ResultCard label="Gratuity Amount" value={formatIndianCurrency(result.gratuityAmount)} color="#F0B429" subtitle="Tax-free up to ₹20,00,000" />
          <div style={{ marginTop: 16, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 8 }}>Calculation Breakdown</div>
            <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>
              (15 &times; {formatIndianCurrency(salary)} &times; {years}) / 26 = <strong style={{ color: 'var(--gold)' }}>{formatIndianCurrency(result.gratuityAmount)}</strong>
            </div>
          </div>
        </div>
      </div>
      <ShareButtons title="Gratuity Calculator" text={`Gratuity for ${years} years of service: ${formatIndianCurrency(result.gratuityAmount)}`} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
