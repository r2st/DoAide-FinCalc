import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateFD } from '../../utils/calculations'
import { formatIndianCurrency } from '../../utils/format'

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)

  const result = calculateFD(principal, rate, years)
  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: result.totalInterest }]

  return (
    <CalculatorLayout title="FD Calculator" description="Calculate Fixed Deposit maturity amount and interest earned with quarterly compounding." path="/fd-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'FD Calculator', url: 'https://calc.doaide.com/fd-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Principal Amount" value={principal} onChange={setPrincipal} min={10000} max={50000000} step={10000} prefix="₹" />
          <SliderInput label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={15} step={0.1} suffix="%" />
          <SliderInput label="Tenure" value={years} onChange={setYears} min={1} max={10} step={1} suffix=" years" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Maturity Amount" value={formatIndianCurrency(result.maturityAmount)} color="#F0B429" />
            <ResultCard label="Total Interest" value={formatIndianCurrency(result.totalInterest)} color="#48BB78" />
          </div>
          <div style={{ height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  <Cell fill="#F0B429" /><Cell fill="#48BB78" />
                </Pie>
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="FD Calculator" text={`FD of ${formatIndianCurrency(principal)} at ${rate}% for ${years} years → ${formatIndianCurrency(result.maturityAmount)}`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'principal', header: 'Principal', format: (v) => formatIndianCurrency(v as number) }, { key: 'interest', header: 'Interest Earned', format: (v) => formatIndianCurrency(v as number) }, { key: 'total', header: 'Total Value', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
