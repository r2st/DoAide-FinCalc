import { formatNumber } from '../utils/format'

interface Props {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
}

export default function SliderInput({ label, value, onChange, min, max, step = 1, prefix, suffix }: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</label>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'var(--bg-input)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '4px 10px',
        }}>
          {prefix && <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600 }}>{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            style={{
              background: 'transparent', border: 'none', color: 'var(--text)',
              fontSize: 15, fontWeight: 600, width: Math.max(80, formatNumber(value).length * 10),
              textAlign: 'right', padding: 0,
            }}
          />
          {suffix && <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{prefix}{formatNumber(min)}{suffix}</span>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{prefix}{formatNumber(max)}{suffix}</span>
      </div>
    </div>
  )
}
