import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateEMI } from '../../utils/calculations'
import { formatIndianCurrency } from '../../utils/format'

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(3000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)

  const result = calculateEMI(principal, rate, tenure)
  const pieData = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: result.totalInterest },
  ]
  const COLORS = ['#F0B429', '#4299E1']

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EMI Calculator',
    description: 'Calculate EMI for home loans, car loans, and personal loans with amortization schedule.',
    url: 'https://calc.doaide.com/emi-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  }

  return (
    <CalculatorLayout
      title="EMI Calculator"
      description="Calculate your monthly EMI for home loans, car loans, and personal loans with detailed amortization schedule."
      path="/emi-calculator"
      jsonLd={jsonLd}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div className="calc-inputs">
          <SliderInput label="Loan Amount" value={principal} onChange={setPrincipal} min={100000} max={50000000} step={100000} prefix="₹" />
          <SliderInput label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={20} step={0.1} suffix="%" />
          <SliderInput label="Loan Tenure" value={tenure} onChange={setTenure} min={12} max={360} step={12} suffix=" months" />
        </div>
        <div className="calc-results">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Monthly EMI" value={formatIndianCurrency(result.emi)} color="#F0B429" />
            <ResultCard label="Total Interest" value={formatIndianCurrency(result.totalInterest)} color="#4299E1" />
            <ResultCard label="Total Payment" value={formatIndianCurrency(result.totalPayment)} color="#48BB78" />
            <ResultCard label="Principal" value={formatIndianCurrency(principal)} color="#9F7AEA" />
          </div>
          <div style={{ height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="EMI Calculator" text={`Monthly EMI: ${formatIndianCurrency(result.emi)} for a loan of ${formatIndianCurrency(principal)}`} />
      <h2 style={{ fontSize: 22, marginTop: 32, marginBottom: 16, color: 'var(--text)' }}>Amortization Schedule</h2>
      <DataTable
        columns={[
          { key: 'month', header: 'Month' },
          { key: 'emi', header: 'EMI', format: (v) => formatIndianCurrency(v as number) },
          { key: 'principal', header: 'Principal', format: (v) => formatIndianCurrency(v as number) },
          { key: 'interest', header: 'Interest', format: (v) => formatIndianCurrency(v as number) },
          { key: 'balance', header: 'Balance', format: (v) => formatIndianCurrency(v as number) },
        ]}
        data={result.amortization}
      />
      <style>{`
        @media (max-width: 768px) {
          .calc-inputs, .calc-results { grid-column: 1 / -1; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </CalculatorLayout>
  )
}
