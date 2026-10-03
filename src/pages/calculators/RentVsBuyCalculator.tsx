import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateRentVsBuy } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function RentVsBuyCalculator() {
  const [price, setPrice] = useState(8000000)
  const [down, setDown] = useState(1600000)
  const [loanRate, setLoanRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [rent, setRent] = useState(25000)
  const [rentInc, setRentInc] = useState(5)
  const [appreciation, setAppreciation] = useState(5)

  const result = calculateRentVsBuy(price, down, loanRate, tenure, rent, rentInc, appreciation)

  return (
    <CalculatorLayout title="Rent vs Buy Calculator" description="Should you rent or buy a house? Compare total costs over time with property appreciation." path="/rent-vs-buy-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Rent vs Buy Calculator', url: 'https://calc.doaide.com/rent-vs-buy-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Property Price" value={price} onChange={setPrice} min={1000000} max={100000000} step={500000} prefix="₹" />
          <SliderInput label="Down Payment" value={down} onChange={setDown} min={0} max={price} step={100000} prefix="₹" />
          <SliderInput label="Loan Interest Rate" value={loanRate} onChange={setLoanRate} min={5} max={15} step={0.25} suffix="%" />
          <SliderInput label="Loan Tenure" value={tenure} onChange={setTenure} min={5} max={30} step={1} suffix=" years" />
          <SliderInput label="Monthly Rent" value={rent} onChange={setRent} min={5000} max={500000} step={1000} prefix="₹" />
          <SliderInput label="Annual Rent Increase" value={rentInc} onChange={setRentInc} min={0} max={15} step={0.5} suffix="%" />
          <SliderInput label="Property Appreciation" value={appreciation} onChange={setAppreciation} min={0} max={15} step={0.5} suffix="%" />
        </div>
        <div>
          <div style={{ padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>Recommendation</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>{result.recommendation}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Net Buy Cost" value={formatIndianCurrency(Math.abs(result.buyCost))} color={result.buyCost < result.rentCost ? '#48BB78' : '#F56565'} subtitle={result.buyCost < 0 ? 'Net gain' : 'Net cost'} />
            <ResultCard label="Net Rent Cost" value={formatIndianCurrency(Math.abs(result.rentCost))} color={result.rentCost < result.buyCost ? '#48BB78' : '#F56565'} subtitle={result.rentCost < 0 ? 'Net gain' : 'Net cost'} />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={result.yearlyComparison}>
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Legend />
                <Line type="monotone" dataKey="buyCumulative" name="Buy Cost" stroke="#F56565" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rentCumulative" name="Rent Cost" stroke="#4299E1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="propertyValue" name="Property Value" stroke="#48BB78" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="Rent vs Buy Calculator" text={result.recommendation} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'buyCumulative', header: 'Buy Cost', format: (v) => formatIndianCurrency(v as number) }, { key: 'rentCumulative', header: 'Rent Cost', format: (v) => formatIndianCurrency(v as number) }, { key: 'propertyValue', header: 'Property Value', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyComparison} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
