import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import { calculateHRA } from '../../utils/calculations'
import { formatIndianCurrency } from '../../utils/format'

export default function HRACalculator() {
  const [basic, setBasic] = useState(50000)
  const [hra, setHra] = useState(20000)
  const [rent, setRent] = useState(15000)
  const [isMetro, setIsMetro] = useState(true)

  const result = calculateHRA(basic, hra, rent, isMetro)
  const pieData = [{ name: 'Exempted', value: result.exemptedHRA }, { name: 'Taxable', value: result.taxableHRA }]

  return (
    <CalculatorLayout title="HRA Calculator" description="Calculate House Rent Allowance tax exemption under Section 10(13A) for salaried employees." path="/hra-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'HRA Calculator', url: 'https://calc.doaide.com/hra-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Basic Salary (Monthly)" value={basic} onChange={setBasic} min={5000} max={500000} step={1000} prefix="₹" />
          <SliderInput label="HRA Received (Monthly)" value={hra} onChange={setHra} min={0} max={200000} step={500} prefix="₹" />
          <SliderInput label="Rent Paid (Monthly)" value={rent} onChange={setRent} min={0} max={200000} step={500} prefix="₹" />
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12 }}>
              City Type:
              <div style={{ display: 'flex', gap: 8 }}>
                {[true, false].map((metro) => (
                  <button key={String(metro)} onClick={() => setIsMetro(metro)} style={{
                    padding: '8px 20px', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 500,
                    background: isMetro === metro ? 'var(--gold)' : 'var(--bg-input)',
                    color: isMetro === metro ? '#000' : 'var(--text-muted)',
                    border: `1px solid ${isMetro === metro ? 'var(--gold)' : 'var(--border)'}`,
                  }}>{metro ? 'Metro' : 'Non-Metro'}</button>
                ))}
              </div>
            </label>
          </div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="HRA Exempted (Yearly)" value={formatIndianCurrency(result.exemptedHRA)} color="#48BB78" />
            <ResultCard label="Taxable HRA (Yearly)" value={formatIndianCurrency(result.taxableHRA)} color="#F56565" />
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  <Cell fill="#48BB78" /><Cell fill="#F56565" />
                </Pie>
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginTop: 16 }}>
            <h3 style={{ fontSize: 14, color: 'var(--gold)', marginBottom: 12 }}>Three Rules (Annual)</h3>
            <div style={{ display: 'grid', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>
              <div>1. Actual HRA received: <strong>{formatIndianCurrency(result.rule1)}</strong></div>
              <div>2. Rent - 10% of Basic: <strong>{formatIndianCurrency(result.rule2)}</strong></div>
              <div>3. {isMetro ? '50%' : '40%'} of Basic: <strong>{formatIndianCurrency(result.rule3)}</strong></div>
              <div style={{ color: 'var(--gold)', fontWeight: 600 }}>Minimum of above = {formatIndianCurrency(result.exemptedHRA)}</div>
            </div>
          </div>
        </div>
      </div>
      <ShareButtons title="HRA Calculator" text={`HRA Exemption: ${formatIndianCurrency(result.exemptedHRA)}/year`} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
