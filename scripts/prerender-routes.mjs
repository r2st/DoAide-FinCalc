// Post-build step: writes dist/<route>/index.html for every public route, with
// that route's title, description, canonical and JSON-LD in the static head,
// plus an h1 in #root. Without it every URL served the homepage shell
// (canonical "/" included), so crawlers saw one page. It also regenerates
// dist/sitemap.xml from the same list. public/serve.json routes each URL to
// its own file; Helmet and createRoot take over once React mounts.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { calculators } from '../src/data/calculators.ts'

const SITE = 'https://calc.doaide.com'
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

// Titles and descriptions mirror the <SEOHead> props on each page.
const ROUTES = [
  {
    path: '/',
    title: 'Free Indian Financial Calculators',
    description: '20+ free financial calculators for India — EMI, SIP, FD, PPF, NPS, GST, HRA and more. All calculations happen instantly in your browser.',
    type: 'WebApplication',
    priority: '1.0',
  },
  {
    path: '/blog',
    title: 'Financial Planning Blog',
    description: 'Expert articles on SIP strategies, home loan tips, retirement planning, and more for Indian investors.',
    type: 'Blog',
    priority: '0.6',
  },
  {
    path: '/blog/best-sip-strategies',
    title: 'Best SIP Strategies for 2024',
    description: 'Learn the most effective SIP strategies for Indian investors including step-up SIP, value averaging, and trigger-based investing.',
    type: 'Article',
    priority: '0.6',
  },
  {
    path: '/blog/home-loan-tips',
    title: '10 Home Loan Tips to Save Lakhs',
    description: 'Smart strategies to reduce your home loan burden with prepayment tactics, balance transfers, and choosing the right tenure.',
    type: 'Article',
    priority: '0.6',
  },
  {
    path: '/blog/retirement-planning-guide',
    title: 'Retirement Planning Guide for Indians in Their 30s',
    description: 'How much you need to retire comfortably in India. A guide covering NPS, EPF, mutual funds, and the 4% rule.',
    type: 'Article',
    priority: '0.6',
  },
  ...calculators.map((c) => ({
    path: c.path,
    title: c.name,
    description: c.description,
    type: 'WebApplication',
    priority: '0.8',
  })),
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function setMeta(html, attr, key, value) {
  const tag = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`)
  if (tag.test(html)) return html.replace(tag, (_, open, close) => `${open}${esc(value)}${close}`)
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`)
}

function jsonLd({ path, title, description, type }) {
  const url = `${SITE}${path}`
  const publisher = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }
  if (type === 'Article') return { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, url, publisher, author: publisher }
  if (type === 'Blog') return { '@context': 'https://schema.org', '@type': 'Blog', name: title, description, url, publisher }
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: path === '/' ? 'DoAide FinCalc' : title,
    url,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher,
  }
}

export function withRoute(shell, route) {
  const { path, title, description } = route
  const url = `${SITE}${path}`
  const fullTitle = `${title} - DoAide FinCalc`
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:title', fullTitle)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'name', 'twitter:title', fullTitle)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  const ld = JSON.stringify(jsonLd(route)).replace(/</g, '\\u003c')
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
  html = html.replace('</head>', `    <script type="application/ld+json">${ld}</script>\n  </head>`)
  return html.replace(
    '<div id="root"></div>',
    `<div id="root"><main><h1>${esc(title)}</h1><p>${esc(description)}</p></main></div>`,
  )
}

function sitemap() {
  const urls = ROUTES.map(
    (r) => `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const shell = readFileSync(join(dist, 'index.html'), 'utf-8')
  if (!shell.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty #root')
  for (const route of ROUTES) {
    const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html')
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, withRoute(shell, route))
  }
  writeFileSync(join(dist, 'sitemap.xml'), sitemap())
  // serve.json lists routes explicitly (a ** rewrite is re-applied to their
  // targets and swallows them), so unknown paths get the SPA with a 404 status.
  writeFileSync(join(dist, '404.html'), shell)
  console.log(`prerendered ${ROUTES.length} route heads + sitemap.xml`)
}
