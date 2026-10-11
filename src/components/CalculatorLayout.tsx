import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from './SEOHead'

interface Props {
  title: string
  description: string
  path: string
  jsonLd?: object
  children: ReactNode
}

export default function CalculatorLayout({ title, description, path, jsonLd, children }: Props) {
  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <SEOHead title={title} description={description} path={path} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <nav style={{ fontSize: 13, color: 'var(--da-text-dim)', marginBottom: 20 }}>
        <Link to="/" style={{ color: 'var(--da-text-dim)' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link to="/#calculators" style={{ color: 'var(--da-text-dim)' }}>Calculators</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--da-text-muted)' }}>{title}</span>
      </nav>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: 'var(--da-text)' }}>{title}</h1>
      <p style={{ color: 'var(--da-text-muted)', marginBottom: 32, fontSize: 16, maxWidth: 700 }}>{description}</p>
      {children}
    </div>
  )
}
