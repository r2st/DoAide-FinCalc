import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateEducationLoan } from '../../utils/calculations'
import { formatIndianCurrency } from '../../utils/format'

export default function EducationLoanCalculator() {
  const [amount, setAmount] = useState(2000000)
  const [rate, setRate] = useState(9)
  const [moratorium, setMoratorium] = useState(12)
  const [repayYears, setRepayYears] = useState(10)

  const result = calculateEducationLoan(amount, rate, moratorium, repayYears)
  const pieData = [{ name: 'Principal', value: amount }, { name: 'Interest', value: result.totalInterest }]

  return (
    <CalculatorLayout title="Education Loan Calculator" description="Calculate education loan EMI with moratorium period for studying in India or abroad." path="/education-loan-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Education Loan Calculator', url: 'https://calc.doaide.com/education-loan-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Loan Amount" value={amount} onChange={setAmount} min={100000} max={50000000} step={50000} prefix="₹" />
          <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={5} max={15} step={0.25} suffix="%" />
          <SliderInput label="Moratorium Period" value={moratorium} onChange={setMoratorium} min={0} max={48} step={6} suffix=" months" />
          <SliderInput label="Repayment Period" value={repayYears} onChange={setRepayYears} min={1} max={20} step={1} suffix=" years" />
          <div style={{ padding: 12, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-dim)' }}>
            During the moratorium period ({moratorium} months), interest accrues but no payment is required. The accrued interest is added to the principal.
          </div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Monthly EMI" value={formatIndianCurrency(result.emi)} color="#F0B429" />
            <ResultCard label="Total Interest" value={formatIndianCurrency(result.totalInterest)} color="#4299E1" />
            <ResultCard label="Total Payment" value={formatIndianCurrency(result.totalPayment)} color="#48BB78" />
          </div>
          <div style={{ height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  <Cell fill="#F0B429" /><Cell fill="#4299E1" />
                </Pie>
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="Education Loan Calculator" text={`Education loan EMI: ${formatIndianCurrency(result.emi)} for ${formatIndianCurrency(amount)}`} />
      <h2 style={{ fontSize: 22, marginTop: 32, marginBottom: 16, color: 'var(--text)' }}>Repayment Schedule</h2>
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
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
