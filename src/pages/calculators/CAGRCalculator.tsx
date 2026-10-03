import { useState } from 'react'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import { calculateCAGR } from '../../utils/calculations'
import { formatIndianCurrency, formatPercent } from '../../utils/format'

export default function CAGRCalculator() {
  const [initial, setInitial] = useState(100000)
  const [final_, setFinal] = useState(250000)
  const [years, setYears] = useState(5)

  const result = calculateCAGR(initial, final_, years)

  return (
    <CalculatorLayout title="CAGR Calculator" description="Calculate Compound Annual Growth Rate to measure investment performance over time." path="/cagr-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'CAGR Calculator', url: 'https://calc.doaide.com/cagr-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Initial Value" value={initial} onChange={setInitial} min={1000} max={100000000} step={1000} prefix="₹" />
          <SliderInput label="Final Value" value={final_} onChange={setFinal} min={1000} max={1000000000} step={1000} prefix="₹" />
          <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" years" />
        </div>
        <div>
          <ResultCard label="CAGR" value={formatPercent(result.cagr)} color="#F0B429" subtitle={`Your investment grew from ${formatIndianCurrency(initial)} to ${formatIndianCurrency(final_)} in ${years} years`} />
          <div style={{ marginTop: 16, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 14, color: 'var(--gold)', marginBottom: 8 }}>Formula</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>CAGR = (Final Value / Initial Value)^(1/n) - 1</p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>= ({formatIndianCurrency(final_)} / {formatIndianCurrency(initial)})^(1/{years}) - 1 = <strong style={{ color: 'var(--gold)' }}>{formatPercent(result.cagr)}</strong></p>
          </div>
        </div>
      </div>
      <ShareButtons title="CAGR Calculator" text={`CAGR: ${formatPercent(result.cagr)} over ${years} years`} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
