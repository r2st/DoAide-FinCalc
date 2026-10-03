import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateSIP } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = calculateSIP(monthly, rate, years)

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'SIP Calculator', description: 'Calculate SIP returns for mutual fund investments.',
    url: 'https://calc.doaide.com/sip-calculator',
    applicationCategory: 'FinanceApplication', operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  }

  return (
    <CalculatorLayout title="SIP Calculator" description="Plan your Systematic Investment Plan returns with year-by-year projections for mutual fund investments." path="/sip-calculator" jsonLd={jsonLd}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} prefix="₹" />
          <SliderInput label="Expected Return Rate" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
          <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" years" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Invested Amount" value={formatIndianCurrency(result.investedAmount)} color="#9F7AEA" />
            <ResultCard label="Estimated Returns" value={formatIndianCurrency(result.estimatedReturns)} color="#48BB78" />
            <ResultCard label="Total Value" value={formatIndianCurrency(result.totalValue)} color="#F0B429" subtitle={formatCompact(result.totalValue)} />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={result.yearlyBreakdown}>
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} labelFormatter={(l) => `Year ${l}`} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Legend />
                <Bar dataKey="invested" name="Invested" fill="#9F7AEA" stackId="a" />
                <Bar dataKey="returns" name="Returns" fill="#48BB78" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="SIP Calculator" text={`Investing ${formatIndianCurrency(monthly)}/month for ${years} years → ${formatIndianCurrency(result.totalValue)}`} />
      <h2 style={{ fontSize: 22, marginTop: 32, marginBottom: 16, color: 'var(--text)' }}>Year-by-Year Breakdown</h2>
      <DataTable
        columns={[
          { key: 'year', header: 'Year' },
          { key: 'invested', header: 'Invested', format: (v) => formatIndianCurrency(v as number) },
          { key: 'returns', header: 'Returns', format: (v) => formatIndianCurrency(v as number) },
          { key: 'total', header: 'Total Value', format: (v) => formatIndianCurrency(v as number) },
        ]}
        data={result.yearlyBreakdown}
      />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
