import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculatePPF } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function PPFCalculator() {
  const [yearly, setYearly] = useState(150000)
  const [years, setYears] = useState(15)

  const result = calculatePPF(yearly, years)

  return (
    <CalculatorLayout title="PPF Calculator" description="Calculate Public Provident Fund maturity amount with current 7.1% interest rate over 15 years." path="/ppf-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'PPF Calculator', url: 'https://calc.doaide.com/ppf-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Yearly Deposit" value={yearly} onChange={setYearly} min={500} max={150000} step={500} prefix="₹" />
          <SliderInput label="Time Period" value={years} onChange={setYears} min={15} max={50} step={5} suffix=" years" />
          <div style={{ padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginTop: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Current PPF Rate</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>7.1% p.a.</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>Compounded yearly. Tax-free under Section 80C.</div>
          </div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Maturity Amount" value={formatIndianCurrency(result.maturityAmount)} color="#F0B429" subtitle={formatCompact(result.maturityAmount)} />
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
                <Bar dataKey="deposit" name="Deposit" fill="#9F7AEA" />
                <Bar dataKey="interest" name="Interest" fill="#48BB78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="PPF Calculator" text={`PPF: ${formatIndianCurrency(yearly)}/year for ${years} years → ${formatIndianCurrency(result.maturityAmount)}`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'deposit', header: 'Deposit', format: (v) => formatIndianCurrency(v as number) }, { key: 'interest', header: 'Interest', format: (v) => formatIndianCurrency(v as number) }, { key: 'balance', header: 'Balance', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
