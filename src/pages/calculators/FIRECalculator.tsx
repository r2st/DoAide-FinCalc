import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateFIRE } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function FIRECalculator() {
  const [expenses, setExpenses] = useState(600000)
  const [currentSavings, setCurrentSavings] = useState(1000000)
  const [annualSavings, setAnnualSavings] = useState(500000)
  const [returns, setReturns] = useState(8)
  const [withdrawalRate, setWithdrawalRate] = useState(4)
  const [inflation, setInflation] = useState(6)

  const result = calculateFIRE(expenses, currentSavings, annualSavings, returns, withdrawalRate, inflation)

  return (
    <CalculatorLayout title="FIRE Calculator" description="Calculate when you can achieve Financial Independence and Retire Early with your savings rate." path="/fire-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'FIRE Calculator', url: 'https://calc.doaide.com/fire-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Annual Expenses" value={expenses} onChange={setExpenses} min={100000} max={5000000} step={50000} prefix="₹" />
          <SliderInput label="Current Savings" value={currentSavings} onChange={setCurrentSavings} min={0} max={100000000} step={100000} prefix="₹" />
          <SliderInput label="Annual Savings" value={annualSavings} onChange={setAnnualSavings} min={50000} max={5000000} step={50000} prefix="₹" />
          <SliderInput label="Investment Return" value={returns} onChange={setReturns} min={4} max={15} step={0.5} suffix="%" />
          <SliderInput label="Withdrawal Rate" value={withdrawalRate} onChange={setWithdrawalRate} min={2} max={6} step={0.5} suffix="%" />
          <SliderInput label="Inflation Rate" value={inflation} onChange={setInflation} min={3} max={10} step={0.5} suffix="%" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="FIRE Number" value={formatIndianCurrency(result.fireNumber)} color="#F0B429" subtitle={formatCompact(result.fireNumber)} />
            <ResultCard label="Years to FIRE" value={result.yearsToFire > 0 ? `${result.yearsToFire} years` : 'Not achievable'} color={result.yearsToFire > 0 ? '#48BB78' : '#F56565'} />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={result.yearlyBreakdown.slice(0, Math.min(40, result.yearlyBreakdown.length))}>
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Legend />
                <Line type="monotone" dataKey="corpus" name="Corpus" stroke="#F0B429" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="targetExpenses" name="FIRE Target" stroke="#F56565" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                {result.yearsToFire > 0 && <ReferenceLine x={result.yearsToFire} stroke="#48BB78" strokeDasharray="3 3" label={{ value: 'FIRE!', position: 'top', fill: '#48BB78' }} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="FIRE Calculator" text={result.yearsToFire > 0 ? `Achieve FIRE in ${result.yearsToFire} years! FIRE number: ${formatIndianCurrency(result.fireNumber)}` : `FIRE number: ${formatIndianCurrency(result.fireNumber)}`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'savings', header: 'Annual Savings', format: (v) => formatIndianCurrency(v as number) }, { key: 'investmentGrowth', header: 'Growth', format: (v) => formatIndianCurrency(v as number) }, { key: 'corpus', header: 'Corpus', format: (v) => formatIndianCurrency(v as number) }, { key: 'targetExpenses', header: 'FIRE Target', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown.slice(0, 40)} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
