import { useState } from 'react'
import CalculatorLayout from '../../components/CalculatorLayout'
import SliderInput from '../../components/SliderInput'
import ResultCard from '../../components/ResultCard'
import ShareButtons from '../../components/ShareButtons'
import { calculateGST } from '../../utils/calculations'
import { formatIndianCurrency } from '../../utils/format'

export default function GSTCalculator() {
  const [amount, setAmount] = useState(10000)
  const [gstRate, setGstRate] = useState(18)
  const [isInclusive, setIsInclusive] = useState(false)

  const result = calculateGST(amount, gstRate, isInclusive)

  return (
    <CalculatorLayout title="GST Calculator" description="Calculate GST amount, CGST, SGST for any goods or services at 5%, 12%, 18%, or 28%." path="/gst-calculator" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'GST Calculator', url: 'https://calc.doaide.com/gst-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <SliderInput label="Amount" value={amount} onChange={setAmount} min={100} max={10000000} step={100} prefix="₹" />
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: 8 }}>GST Rate</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[5, 12, 18, 28].map((r) => (
                <button key={r} onClick={() => setGstRate(r)} style={{
                  flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: 15, fontWeight: 600,
                  background: gstRate === r ? 'var(--gold)' : 'var(--bg-input)',
                  color: gstRate === r ? '#000' : 'var(--text-muted)',
                  border: `1px solid ${gstRate === r ? 'var(--gold)' : 'var(--border)'}`,
                }}>{r}%</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: 8 }}>Type</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[false, true].map((inc) => (
                <button key={String(inc)} onClick={() => setIsInclusive(inc)} style={{
                  flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 500,
                  background: isInclusive === inc ? 'var(--gold)' : 'var(--bg-input)',
                  color: isInclusive === inc ? '#000' : 'var(--text-muted)',
                  border: `1px solid ${isInclusive === inc ? 'var(--gold)' : 'var(--border)'}`,
                }}>{inc ? 'GST Inclusive' : 'GST Exclusive'}</button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <ResultCard label="Base Amount" value={formatIndianCurrency(result.baseAmount)} color="#9F7AEA" />
            <ResultCard label="GST Amount" value={formatIndianCurrency(result.gstAmount)} color="#F0B429" />
            <ResultCard label="CGST" value={formatIndianCurrency(result.cgst)} color="#4299E1" subtitle={`${gstRate / 2}%`} />
            <ResultCard label="SGST" value={formatIndianCurrency(result.sgst)} color="#48BB78" subtitle={`${gstRate / 2}%`} />
          </div>
          <div style={{ marginTop: 16, padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '2px solid var(--gold)', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Total Amount</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--gold)' }}>{formatIndianCurrency(result.totalAmount)}</div>
          </div>
        </div>
      </div>
      <ShareButtons title="GST Calculator" text={`GST on ${formatIndianCurrency(result.baseAmount)} at ${gstRate}% = ${formatIndianCurrency(result.gstAmount)}`} />
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </CalculatorLayout>
  )
}
