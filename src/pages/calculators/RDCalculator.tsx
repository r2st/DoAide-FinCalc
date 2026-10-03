import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateRD } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function RDCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)

  const result = calculateRD(monthly, rate, years)

  return (
    <CalculatorLayout title="RD Calculator" description="Calculate Recurring Deposit maturity amount for monthly savings with compounding interest." path="/rd-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'RD Calculator', url: 'https://calc.doaide.com/rd-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Monthly Deposit" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} prefix="₹" />
          <SliderInput label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={15} step={0.1} suffix="%" />
          <SliderInput label="Tenure" value={years} onChange={setYears} min={1} max={10} step={1} suffix=" years" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Maturity Amount" value={formatIndianCurrency(result.maturityAmount)} color="#F0B429" />
            <ResultCard label="Total Deposited" value={formatIndianCurrency(result.totalDeposited)} color="#9F7AEA" />
            <ResultCard label="Total Interest" value={formatIndianCurrency(result.totalInterest)} color="#48BB78" />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={result.yearlyBreakdown}>
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Legend />
                <Bar dataKey="deposited" name="Deposited" fill="#9F7AEA" stackId="a" />
                <Bar dataKey="interest" name="Interest" fill="#48BB78" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="RD Calculator" text={`RD of ${formatIndianCurrency(monthly)}/month at ${rate}% for ${years} years → ${formatIndianCurrency(result.maturityAmount)}`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'deposited', header: 'Deposited', format: (v) => formatIndianCurrency(v as number) }, { key: 'interest', header: 'Interest', format: (v) => formatIndianCurrency(v as number) }, { key: 'total', header: 'Total', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
