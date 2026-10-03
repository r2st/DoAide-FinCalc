import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import { calculateStampDuty } from '../../utils/calculations'
import { formatIndianCurrency } from '../../utils/format'

const states = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu'] as const

export default function StampDutyCalculator() {
  const [value, setValue] = useState(8000000)
  const [state, setState] = useState('maharashtra')

  const result = calculateStampDuty(value, state)
  const pieData = [
    { name: 'Property Value', value },
    { name: 'Stamp Duty', value: result.stampDuty },
    { name: 'Registration', value: result.registrationCharges },
  ]

  return (
    <CalculatorLayout title="Stamp Duty Calculator" description="Calculate stamp duty and registration charges for property purchase in Maharashtra, Karnataka, Delhi, Tamil Nadu." path="/stamp-duty-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Stamp Duty Calculator', url: 'https://calc.doaide.com/stamp-duty-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Property Value" value={value} onChange={setValue} min={500000} max={100000000} step={100000} prefix="₹" />
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: 8 }}>State</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {states.map((s) => (
                <button key={s} onClick={() => setState(s.toLowerCase())} style={{
                  padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 500,
                  background: state === s.toLowerCase() ? 'var(--gold)' : 'var(--bg-input)',
                  color: state === s.toLowerCase() ? '#000' : 'var(--text-muted)',
                  border: `1px solid ${state === s.toLowerCase() ? 'var(--gold)' : 'var(--border)'}`,
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label={`Stamp Duty (${result.stampDutyRate}%)`} value={formatIndianCurrency(result.stampDuty)} color="#F0B429" />
            <ResultCard label={`Registration (${result.registrationRate}%)`} value={formatIndianCurrency(result.registrationCharges)} color="#4299E1" />
            <ResultCard label="Total Cost" value={formatIndianCurrency(result.totalCost)} color="#48BB78" subtitle="Property + Stamp Duty + Registration" />
          </div>
          <div style={{ height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}>
                  <Cell fill="#9F7AEA" /><Cell fill="#F0B429" /><Cell fill="#4299E1" />
                </Pie>
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="Stamp Duty Calculator" text={`Stamp Duty in ${state}: ${formatIndianCurrency(result.stampDuty)} on ${formatIndianCurrency(value)} property`} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
