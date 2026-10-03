import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

const posts = [
  {
    slug: 'best-sip-strategies',
    title: 'Best SIP Strategies for 2024: A Complete Guide for Indian Investors',
    excerpt: 'Learn the most effective SIP strategies including step-up SIP, value averaging, and trigger-based investing to maximize your mutual fund returns.',
    date: 'October 2024',
    readTime: '8 min read',
  },
  {
    slug: 'home-loan-tips',
    title: '10 Home Loan Tips That Can Save You Lakhs in Interest',
    excerpt: 'Smart strategies to reduce your home loan burden — from prepayment tactics to balance transfer to choosing the right tenure.',
    date: 'October 2024',
    readTime: '7 min read',
  },
  {
    slug: 'retirement-planning-guide',
    title: 'The Ultimate Retirement Planning Guide for Indians in Their 30s',
    excerpt: 'How much do you need to retire comfortably in India? A step-by-step guide covering NPS, EPF, mutual funds, and the 4% rule.',
    date: 'October 2024',
    readTime: '10 min read',
  },
]

export default function BlogIndex() {
  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <SEOHead title="Financial Planning Blog" description="Expert articles on SIP strategies, home loan tips, retirement planning, and more for Indian investors." path="/blog" />
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Financial Planning Blog</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Expert guides and strategies for Indian investors.</p>
      <div style={{ display: 'grid', gap: 24 }}>
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} style={{
            display: 'block', padding: 24,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', transition: 'border-color 0.2s',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 8 }}>{post.date} &middot; {post.readTime}</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{post.title}</h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>{post.excerpt}</p>
            <span style={{ display: 'inline-block', marginTop: 12, fontSize: 14, color: 'var(--gold)', fontWeight: 500 }}>Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
