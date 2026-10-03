import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateSWP } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function SWPCalculator() {
  const [investment, setInvestment] = useState(5000000)
  const [withdrawal, setWithdrawal] = useState(30000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(20)

  const result = calculateSWP(investment, withdrawal, rate, years)

  return (
    <CalculatorLayout title="SWP Calculator" description="Calculate systematic withdrawal plan to know how long your investment corpus will last." path="/swp-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'SWP Calculator', url: 'https://calc.doaide.com/swp-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Total Investment" value={investment} onChange={setInvestment} min={100000} max={100000000} step={100000} prefix="₹" />
          <SliderInput label="Monthly Withdrawal" value={withdrawal} onChange={setWithdrawal} min={1000} max={500000} step={1000} prefix="₹" />
          <SliderInput label="Expected Return Rate" value={rate} onChange={setRate} min={1} max={20} step={0.5} suffix="%" />
          <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" years" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Total Withdrawn" value={formatIndianCurrency(result.totalWithdrawn)} color="#F0B429" />
            <ResultCard label="Final Balance" value={formatIndianCurrency(result.finalValue)} color="#48BB78" subtitle={formatCompact(result.finalValue)} />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={result.yearlyBreakdown}>
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Line type="monotone" dataKey="balance" stroke="#F0B429" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="SWP Calculator" text={`Withdrawing ${formatIndianCurrency(withdrawal)}/month from ${formatIndianCurrency(investment)}`} />
      <h2 style={{ fontSize: 22, marginTop: 32, marginBottom: 16, color: 'var(--text)' }}>Year-by-Year Breakdown</h2>
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'withdrawal', header: 'Withdrawn', format: (v) => formatIndianCurrency(v as number) }, { key: 'balance', header: 'Balance', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
