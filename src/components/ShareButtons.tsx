import { FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

interface Props {
  title: string
  text: string
  url?: string
}

export default function ShareButtons({ title, text, url }: Props) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${text}\n${shareUrl}`)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - ${text}`)}&url=${encodeURIComponent(shareUrl)}`

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '10px 20px', border: '1px solid var(--gold)',
    borderRadius: 'var(--radius-sm)', color: 'var(--gold)',
    fontSize: 14, fontWeight: 500, transition: 'all 0.2s',
  }

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        <FaWhatsapp size={18} /> Share on WhatsApp
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        <FaXTwitter size={16} /> Share on X
      </a>
    </div>
  )
}
