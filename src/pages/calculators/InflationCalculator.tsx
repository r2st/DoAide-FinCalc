import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateInflation } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function InflationCalculator() {
  const [cost, setCost] = useState(100000)
  const [rate, setRate] = useState(6)
  const [years, setYears] = useState(10)

  const result = calculateInflation(cost, rate, years)

  return (
    <CalculatorLayout title="Inflation Calculator" description="Calculate the future cost of goods and services based on inflation rate in India." path="/inflation-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Inflation Calculator', url: 'https://calc.doaide.com/inflation-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Current Cost" value={cost} onChange={setCost} min={1000} max={10000000} step={1000} prefix="₹" />
          <SliderInput label="Inflation Rate" value={rate} onChange={setRate} min={1} max={15} step={0.5} suffix="%" />
          <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" years" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Future Cost" value={formatIndianCurrency(result.futureCost)} color="#F56565" subtitle={formatCompact(result.futureCost)} />
            <ResultCard label="Cost Increase" value={formatIndianCurrency(result.futureCost - cost)} color="#F0B429" />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={result.yearlyBreakdown}>
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Line type="monotone" dataKey="cost" stroke="#F56565" strokeWidth={2} dot={false} name="Cost" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="Inflation Calculator" text={`${formatIndianCurrency(cost)} today will cost ${formatIndianCurrency(result.futureCost)} in ${years} years at ${rate}% inflation`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'cost', header: 'Projected Cost', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
