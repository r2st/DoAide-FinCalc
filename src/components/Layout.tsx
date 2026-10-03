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
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64,
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>DoAide</span>
            <span style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 400 }}>FinCalc</span>
          </Link>
          <nav style={{
            display: menuOpen ? 'flex' : undefined,
            ...(menuOpen ? {
              position: 'fixed' as const, top: 64, left: 0, right: 0, bottom: 0,
              flexDirection: 'column' as const, background: 'var(--bg)', padding: 24, gap: 24, zIndex: 99,
            } : { display: 'none' }),
          }} className="desktop-nav">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
                color: location.pathname === l.to ? 'var(--gold)' : 'var(--text-muted)',
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
            .mobile-menu-btn { display: flex !important; align-items: center; padding: 8px; color: var(--text); }
          }
        `}</style>
      </header>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 16px', textAlign: 'center',
        color: 'var(--text-dim)', fontSize: 14,
      }}>
        <div className="container">
          <p style={{ marginBottom: 8 }}>
            &copy; {new Date().getFullYear()} DoAide. Free financial calculators for India.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/blog" style={{ color: 'var(--text-dim)' }}>Blog</Link>
            <Link to="/embed" style={{ color: 'var(--text-dim)' }}>Embed Widget</Link>
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)' }}>DoAide Suite</a>
          </div>
        </div>
      </footer>
    </>
  )
}
