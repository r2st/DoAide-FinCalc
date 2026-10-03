import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateNPS } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function NPSCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(10)
  const [age, setAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)

  const result = calculateNPS(monthly, rate, age, retireAge)
  const pieData = [{ name: 'Pension Wealth (60%)', value: result.pensionWealth }, { name: 'Annuity (40%)', value: result.annuityInvestment }]

  return (
    <CalculatorLayout title="NPS Calculator" description="Calculate National Pension System corpus, pension wealth, and estimated monthly pension." path="/nps-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'NPS Calculator', url: 'https://calc.doaide.com/nps-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Monthly Contribution" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} prefix="₹" />
          <SliderInput label="Expected Return Rate" value={rate} onChange={setRate} min={4} max={14} step={0.5} suffix="%" />
          <SliderInput label="Current Age" value={age} onChange={setAge} min={18} max={55} step={1} suffix=" years" />
          <SliderInput label="Retirement Age" value={retireAge} onChange={setRetireAge} min={age + 5} max={70} step={1} suffix=" years" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Total Corpus" value={formatIndianCurrency(result.totalCorpus)} color="#F0B429" subtitle={formatCompact(result.totalCorpus)} />
            <ResultCard label="Total Invested" value={formatIndianCurrency(result.totalInvested)} color="#9F7AEA" />
            <ResultCard label="Pension Wealth (60%)" value={formatIndianCurrency(result.pensionWealth)} color="#48BB78" />
            <ResultCard label="Est. Monthly Pension" value={formatIndianCurrency(result.estimatedPension)} color="#F687B3" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                    <Cell fill="#48BB78" /><Cell fill="#F687B3" />
                  </Pie>
                  <Tooltip formatter={(v) => formatIndianCurrency(v as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer>
                <LineChart data={result.yearlyBreakdown}>
                  <XAxis dataKey="age" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => formatCompact(v)} />
                  <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Line type="monotone" dataKey="corpus" stroke="#F0B429" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <ShareButtons title="NPS Calculator" text={`NPS corpus at ${retireAge}: ${formatIndianCurrency(result.totalCorpus)}, Monthly pension: ${formatIndianCurrency(result.estimatedPension)}`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'age', header: 'Age' }, { key: 'invested', header: 'Invested', format: (v) => formatIndianCurrency(v as number) }, { key: 'corpus', header: 'Corpus', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
