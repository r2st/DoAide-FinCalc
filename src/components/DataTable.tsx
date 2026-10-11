import { useState } from 'react'

interface Column {
  key: string
  header: string
  format?: (v: unknown) => string
}

interface Props {
  columns: Column[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  maxRows?: number
}

export default function DataTable({ columns, data, maxRows = 12 }: Props) {
  const [showAll, setShowAll] = useState(false)
  const visibleData = showAll ? data : data.slice(0, maxRows)

  return (
    <div style={{ overflowX: 'auto', marginTop: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: 'left', padding: '10px 12px',
                color: 'var(--da-primary)', fontWeight: 600, fontSize: 12,
                textTransform: 'uppercase', letterSpacing: '0.5px',
                borderBottom: '1px solid var(--da-border-light)',
                whiteSpace: 'nowrap',
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'var(--da-bg-card)' : 'var(--da-bg-card-alt)' }}>
              {columns.map((c) => (
                <td key={c.key} style={{
                  padding: '8px 12px', color: 'var(--da-text-muted)',
                  borderBottom: '1px solid var(--da-border)', whiteSpace: 'nowrap',
                }}>{c.format ? c.format(row[c.key]) : String(row[c.key] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > maxRows && !showAll && (
        <button onClick={() => setShowAll(true)} style={{
          display: 'block', width: '100%', padding: '12px',
          color: 'var(--da-primary)', background: 'var(--da-bg-card)',
          border: '1px solid var(--da-border)', borderTop: 'none',
          borderRadius: '0 0 var(--da-radius-sm) var(--da-radius-sm)',
          fontSize: 14, fontWeight: 500,
        }}>Show all {data.length} rows</button>
      )}
    </div>
  )
}
