import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import DataTable from '../../components/DataTable'
import { calculateEPF } from '../../utils/calculations'
import { formatIndianCurrency, formatCompact } from '../../utils/format'

export default function EPFCalculator() {
  const [salary, setSalary] = useState(50000)
  const [years, setYears] = useState(30)
  const [increment, setIncrement] = useState(5)
  const [currentBalance, setCurrentBalance] = useState(0)

  const result = calculateEPF(salary, 12, 3.67, currentBalance, years, increment)

  return (
    <CalculatorLayout title="EPF Calculator" description="Calculate your Employee Provident Fund corpus at retirement including employer contribution." path="/epf-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'EPF Calculator', url: 'https://calc.doaide.com/epf-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Basic Salary (Monthly)" value={salary} onChange={setSalary} min={5000} max={500000} step={1000} prefix="₹" />
          <SliderInput label="Years to Retirement" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" years" />
          <SliderInput label="Annual Salary Increment" value={increment} onChange={setIncrement} min={0} max={20} step={0.5} suffix="%" />
          <SliderInput label="Current EPF Balance" value={currentBalance} onChange={setCurrentBalance} min={0} max={10000000} step={10000} prefix="₹" />
          <div style={{ padding: 12, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-dim)' }}>
            Employee: 12% | Employer (EPF): 3.67% | EPF Rate: 8.25% p.a.
          </div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Total Corpus" value={formatIndianCurrency(result.totalBalance)} color="#F0B429" subtitle={formatCompact(result.totalBalance)} />
            <ResultCard label="Employee Contribution" value={formatIndianCurrency(result.employeeTotal)} color="#9F7AEA" />
            <ResultCard label="Employer Contribution" value={formatIndianCurrency(result.employerTotal)} color="#4299E1" />
            <ResultCard label="Interest Earned" value={formatIndianCurrency(result.interestEarned)} color="#48BB78" />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={result.yearlyBreakdown}>
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCompact(v)} />
                <Tooltip formatter={(v) => formatIndianCurrency(v as number)} contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Line type="monotone" dataKey="balance" stroke="#F0B429" strokeWidth={2} dot={false} name="Balance" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ShareButtons title="EPF Calculator" text={`EPF corpus after ${years} years: ${formatIndianCurrency(result.totalBalance)}`} />
      <DataTable columns={[{ key: 'year', header: 'Year' }, { key: 'salary', header: 'Monthly Salary', format: (v) => formatIndianCurrency(v as number) }, { key: 'employeeContrib', header: 'Employee', format: (v) => formatIndianCurrency(v as number) }, { key: 'employerContrib', header: 'Employer', format: (v) => formatIndianCurrency(v as number) }, { key: 'interest', header: 'Interest', format: (v) => formatIndianCurrency(v as number) }, { key: 'balance', header: 'Balance', format: (v) => formatIndianCurrency(v as number) }]} data={result.yearlyBreakdown} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
