interface Props {
  label: string
  value: string
  prefix?: string
  suffix?: string
  color?: string
  subtitle?: string
}

export default function ResultCard({ label, value, color = 'var(--gold)', subtitle }: Props) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '20px 24px',
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1.2 }}>{value}</div>
      {subtitle && <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>{subtitle}</div>}
    </div>
  )
}
