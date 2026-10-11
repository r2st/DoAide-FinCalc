import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { calculators, categories } from '../data/calculators'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = calculators.filter((c) => {
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = !activeCategory || c.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <SEOHead title="Free Indian Financial Calculators" description="50+ free financial calculators for India — EMI, SIP, FD, PPF, NPS, GST, HRA, and more. All calculations happen instantly in your browser." path="/" />
      <section style={{
        padding: '80px 16px 60px', textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(13,148,136,0.06) 0%, transparent 100%)',
      }}>
        <div className="container">
          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            <span style={{ color: 'var(--da-primary)' }}>20+ Free</span> Financial Calculators
            <br />for India
          </h1>
          <p style={{ fontSize: 18, color: 'var(--da-text-muted)', maxWidth: 600, margin: '0 auto 32px' }}>
            EMI, SIP, FD, PPF, NPS, GST, HRA and more — instant results, beautiful charts, completely free. No sign-up required.
          </p>
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search calculators... (e.g., EMI, SIP, FD)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 20px', fontSize: 16,
                borderRadius: 'var(--da-radius)', border: '2px solid var(--da-border)',
                background: 'var(--da-bg-input)',
              }}
            />
          </div>
        </div>
      </section>

      <section id="calculators" className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => setActiveCategory(null)} style={{
            padding: '8px 20px', borderRadius: 20, fontSize: 14, fontWeight: 500,
            background: !activeCategory ? 'var(--da-primary)' : 'var(--da-bg-input)',
            color: !activeCategory ? '#fff' : 'var(--da-text-muted)',
            border: `1px solid ${!activeCategory ? 'var(--da-primary)' : 'var(--da-border)'}`,
          }}>All</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)} style={{
              padding: '8px 20px', borderRadius: 20, fontSize: 14, fontWeight: 500,
              background: activeCategory === cat.id ? 'var(--da-primary)' : 'var(--da-bg-input)',
              color: activeCategory === cat.id ? '#fff' : 'var(--da-text-muted)',
              border: `1px solid ${activeCategory === cat.id ? 'var(--da-primary)' : 'var(--da-border)'}`,
            }}>{cat.icon} {cat.name}</button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {filtered.map((calc) => (
            <Link key={calc.id} to={calc.path} style={{
              display: 'block', padding: 24,
              background: 'var(--da-bg-card)', border: '1px solid var(--da-border)',
              borderRadius: 'var(--da-radius)', transition: 'all 0.2s',
              borderTop: `3px solid ${calc.color}`,
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = calc.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--da-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{calc.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--da-text)', marginBottom: 6 }}>{calc.name}</h3>
              <p style={{ fontSize: 14, color: 'var(--da-text-muted)', lineHeight: 1.5 }}>{calc.description}</p>
              <div style={{ marginTop: 12, fontSize: 13, color: calc.color, fontWeight: 500 }}>Calculate →</div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--da-text-dim)' }}>
            No calculators found for "{search}". Try a different search term.
          </div>
        )}
      </section>
    </div>
  )
}
