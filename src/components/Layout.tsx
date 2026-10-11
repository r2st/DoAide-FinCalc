import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/embed', label: 'Embed' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--da-border)',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64,
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--da-primary)' }}>DoAide</span>
            <span style={{ fontSize: 22, fontWeight: 300, color: 'var(--da-text-dim)' }}>|</span>
            <span style={{ fontSize: 16, color: 'var(--da-text-muted)', fontWeight: 500 }}>FinCalc</span>
          </Link>
          <nav style={{
            display: menuOpen ? 'flex' : undefined,
            ...(menuOpen ? {
              position: 'fixed' as const, top: 64, left: 0, right: 0, bottom: 0,
              flexDirection: 'column' as const, background: 'var(--da-bg)', padding: 24, gap: 24, zIndex: 99,
            } : { display: 'none' }),
          }} className="desktop-nav">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
                color: location.pathname === l.to ? 'var(--da-primary)' : 'var(--da-text-muted)',
                fontSize: 15, fontWeight: 500, transition: 'color 0.2s',
              }}>{l.label}</Link>
            ))}
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" aria-label="Menu">
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        <style>{`
          .desktop-nav { display: flex !important; gap: 32px; }
          .mobile-menu-btn { display: none !important; }
          @media (max-width: 768px) {
            .desktop-nav { display: ${menuOpen ? 'flex' : 'none'} !important; }
            .mobile-menu-btn { display: flex !important; align-items: center; padding: 8px; color: var(--da-text); }
          }
        `}</style>
      </header>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        borderTop: '1px solid var(--da-border)',
        padding: '40px 16px 32px', textAlign: 'center',
        color: 'var(--da-text-dim)', fontSize: 14,
        background: 'var(--da-bg-card)',
      }}>
        <div className="container">
          <div style={{
            display: 'inline-block', marginBottom: 16, padding: '4px 12px',
            background: 'var(--da-primary)', color: '#fff',
            borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>A DoAide Product</div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
            <Link to="/blog" style={{ color: 'var(--da-text-muted)', fontWeight: 500 }}>Blog</Link>
            <Link to="/embed" style={{ color: 'var(--da-text-muted)', fontWeight: 500 }}>Embed Widget</Link>
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--da-text-muted)', fontWeight: 500 }}>DoAide Home</a>
          </div>
          <p style={{ fontSize: 13, color: 'var(--da-text-dim)' }}>
            &copy; {new Date().getFullYear()} DoAide. Free financial calculators for India.
          </p>
        </div>
      </footer>
    </>
  )
}
