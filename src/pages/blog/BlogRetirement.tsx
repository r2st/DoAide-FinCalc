import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function BlogRetirement() {
  const s: React.CSSProperties = { color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 16, marginBottom: 16 }
  const h2: React.CSSProperties = { fontSize: 24, fontWeight: 600, color: 'var(--text)', marginTop: 32, marginBottom: 12 }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 64, maxWidth: 800, margin: '0 auto' }}>
      <SEOHead title="Retirement Planning Guide for Indians in Their 30s" description="How much you need to retire comfortably in India. A guide covering NPS, EPF, mutual funds, and the 4% rule." path="/blog/retirement-planning-guide" />
      <nav style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 20 }}>
        <Link to="/" style={{ color: 'var(--text-dim)' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link to="/blog" style={{ color: 'var(--text-dim)' }}>Blog</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--text-muted)' }}>Retirement Guide</span>
      </nav>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>The Ultimate Retirement Planning Guide for Indians in Their 30s</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>October 2024 &middot; 10 min read</p>

      <p style={s}>If you're in your 30s, retirement might seem decades away. But starting now is the single most important financial decision you can make. Thanks to compound interest, every year of delay costs you exponentially. Here's a complete framework for retirement planning in India.</p>

      <h2 style={h2}>How Much Do You Need?</h2>
      <p style={s}>The quick rule: you need 25-30 times your annual expenses at retirement (adjusted for inflation). If you spend ₹50,000/month today, at 6% inflation, you'll need about ₹1.6 lakhs/month at age 60. That translates to a corpus of roughly ₹5-6 crores. Sounds intimidating? Use our <Link to="/retirement-planning-calculator" style={{ color: 'var(--gold)' }}>Retirement Calculator</Link> to get your exact number.</p>

      <h2 style={h2}>The Three Pillars of Retirement in India</h2>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginTop: 20, marginBottom: 8 }}>Pillar 1: EPF (Employee Provident Fund)</h3>
      <p style={s}>If you're salaried, 12% of your basic salary goes to EPF (matched by employer at 3.67% to EPF). At the current rate of 8.25%, this alone can build a significant corpus over 30 years. Check your projected EPF balance with our <Link to="/epf-calculator" style={{ color: 'var(--gold)' }}>EPF Calculator</Link>. Never withdraw your EPF when switching jobs — let it compound.</p>

      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginTop: 20, marginBottom: 8 }}>Pillar 2: NPS (National Pension System)</h3>
      <p style={s}>NPS offers one of the best risk-reward ratios for retirement savings. You get tax benefits under Section 80CCD(1B) — an additional ₹50,000 deduction over and above 80C. The equity allocation (up to 75%) generates market-linked returns. At retirement, 60% is tax-free withdrawal, and 40% goes to a pension annuity. Calculate your NPS corpus with our <Link to="/nps-calculator" style={{ color: 'var(--gold)' }}>NPS Calculator</Link>.</p>

      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginTop: 20, marginBottom: 8 }}>Pillar 3: Equity Mutual Funds via SIP</h3>
      <p style={s}>This is where the real wealth-building happens. Equity mutual funds have historically delivered 12-15% CAGR over long periods in India. A SIP of ₹20,000/month at 12% for 30 years grows to approximately ₹7 crores. Use our <Link to="/sip-calculator" style={{ color: 'var(--gold)' }}>SIP Calculator</Link> to model different scenarios.</p>

      <h2 style={h2}>The 4% Rule (Adapted for India)</h2>
      <p style={s}>The 4% rule says you can safely withdraw 4% of your corpus annually in retirement without running out. In India, with higher inflation (6% vs 2-3% in the US), you might want to use 3-3.5% for added safety. This means you need roughly 28-33 times your annual expenses. Our <Link to="/fire-calculator" style={{ color: 'var(--gold)' }}>FIRE Calculator</Link> models this for you.</p>

      <h2 style={h2}>Practical Action Plan</h2>
      <ol style={{ ...s, paddingLeft: 24 }}>
        <li style={{ marginBottom: 12 }}>Calculate your retirement corpus number (use our calculator)</li>
        <li style={{ marginBottom: 12 }}>Maximize EPF — don't withdraw on job changes</li>
        <li style={{ marginBottom: 12 }}>Start NPS with at least ₹50,000/year for the tax benefit</li>
        <li style={{ marginBottom: 12 }}>Set up equity SIPs — at least 20% of your take-home pay</li>
        <li style={{ marginBottom: 12 }}>Get term insurance (10x annual income) and health insurance</li>
        <li style={{ marginBottom: 12 }}>Build an emergency fund of 6-12 months' expenses in FD/liquid funds</li>
        <li>Review and rebalance annually. Increase SIPs by 10% every year</li>
      </ol>

      <h2 style={h2}>Common Mistakes to Avoid</h2>
      <ul style={{ ...s, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>Treating real estate as your only retirement plan</li>
        <li style={{ marginBottom: 8 }}>Choosing endowment/ULIP plans over term + mutual fund combination</li>
        <li style={{ marginBottom: 8 }}>Not accounting for healthcare inflation (10-12% in India)</li>
        <li style={{ marginBottom: 8 }}>Withdrawing EPF/PPF for short-term needs</li>
        <li>Delaying the start — even 5 years delay reduces final corpus by 40%</li>
      </ul>

      <div style={{ marginTop: 32, padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--gold)', textAlign: 'center' }}>
        <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Start planning your retirement today</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/retirement-planning-calculator" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--gold)', color: '#000', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 15 }}>Retirement Calculator →</Link>
          <Link to="/fire-calculator" style={{ display: 'inline-block', padding: '12px 24px', border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 15 }}>FIRE Calculator →</Link>
        </div>
      </div>
    </div>
  )
}
