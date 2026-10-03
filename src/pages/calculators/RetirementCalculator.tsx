import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateRetirement } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function RetirementCalculator() {
  const [age, setAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [expenses, setExpenses] = useState(50000)
  const [inflation, setInflation] = useState(6)
  const [returns, setReturns] = useState(12)
  const [savings, setSavings] = useState(500000)

  const result = calculateRetirement(age, retireAge, expenses, inflation, returns, savings)

  return (
    <CalculatorLayout title="Retirement Planning Calculator" description="Plan your retirement corpus and monthly savings needed to retire comfortably in India." path="/retirement-planning-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Retirement Planning Calculator', url: 'https://calc.doaide.com/retirement-planning-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Current Age" value={age} onChange={setAge} min={18} max={55} step={1} suffix=" years" />
          <SliderInput label="Retirement Age" value={retireAge} onChange={setRetireAge} min={age + 5} max={70} step={1} suffix=" years" />
          <SliderInput label="Monthly Expenses" value={expenses} onChange={setExpenses} min={10000} max={500000} step={5000} prefix="₹" />
          <SliderInput label="Expected Inflation" value={inflation} onChange={setInflation} min={3} max={10} step={0.5} suffix="%" />
          <SliderInput label="Expected Return on Investment" value={returns} onChange={setReturns} min={6} max={18} step={0.5} suffix="%" />
          <SliderInput label="Current Savings" value={savings} onChange={setSavings} min={0} max={50000000} step={50000} prefix="₹" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Corpus Required" value={formatIndianCurrency(result.corpusRequired)} color="#F0B429" subtitle={formatCompact(result.corpusRequired)} />
            <ResultCard label="Monthly Savings Needed" value={formatIndianCurrency(result.monthlySavingsNeeded)} color="#48BB78" />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={result.yearlyBreakdown}>
                <XAxis dataKey="age" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Legend />
                <Line type="monotone" dataKey="corpus" name="Corpus" stroke="#F0B429" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expenses" name="Annual Expenses" stroke="#F56565" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="Retirement Planner" text={`Need ${formatIndianCurrency(result.corpusRequired)} to retire at ${retireAge}. Save ${formatIndianCurrency(result.monthlySavingsNeeded)}/month.`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'age', header: 'Age' }, { key: 'expenses', header: 'Annual Expenses', format: (v) => formatIndianCurrency(v as number) }, { key: 'savings', header: 'Annual Savings', format: (v) => formatIndianCurrency(v as number) }, { key: 'corpus', header: 'Corpus', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
