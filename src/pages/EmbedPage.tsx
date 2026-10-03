import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import { calculators } from '../data/calculators'

export default function EmbedPage() {
  const [selected, setSelected] = useState('emi-calculator')
  const [width, setWidth] = useState('100%')
  const [height, setHeight] = useState('700')

  const calc = calculators.find((c) => c.id === selected)
  const embedCode = `<iframe src="https://calc.doaide.com${calc?.path}" width="${width}" height="${height}px" frameborder="0" style="border:1px solid #222;border-radius:12px;" title="${calc?.name}"></iframe>`

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <SEOHead title="Embed Financial Calculators" description="Embed free Indian financial calculators on your website or blog." path="/embed" />
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Embed Calculators</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, maxWidth: 600 }}>
        Add any of our financial calculators to your website or blog. Just copy the embed code below.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: 8 }}>Select Calculator</label>
            <select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ padding: '10px 14px' }}>
              {calculators.map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: 8 }}>Width</label>
            <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="100% or 600px" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: 8 }}>Height (px)</label>
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="700" />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: 8 }}>Embed Code</label>
          <textarea
            readOnly
            value={embedCode}
            style={{
              width: '100%', height: 120, padding: 14,
              background: 'var(--bg-input)', border: '1px solid var(--border)',
              color: 'var(--gold)', borderRadius: 'var(--radius-sm)',
              fontFamily: 'monospace', fontSize: 13, resize: 'none',
            }}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
          <button
            onClick={() => navigator.clipboard.writeText(embedCode)}
            style={{
              marginTop: 8, padding: '10px 24px',
              background: 'var(--gold)', color: '#000',
              borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14,
            }}
          >Copy Code</button>
          <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 8 }}>Preview</div>
            <div style={{ background: '#000', borderRadius: 8, padding: 8, overflow: 'hidden' }}>
              <iframe
                src={calc?.path}
                width="100%"
                height="400px"
                style={{ border: 'none', borderRadius: 8 }}
                title={calc?.name}
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
