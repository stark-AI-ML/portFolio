import { socialIcons } from './Icons'

export default function Footer({ personal }) {
  return (
    <footer style={{ width: '100%', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '2rem 1.5rem 2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Top Row: Name/Tagline & Socials */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--fg)', margin: 0 }}>{personal.name}</p>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, maxWidth: '300px' }}>Keep moving faword Dr. senku</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {Object.entries(personal.socials).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                return (
                  <a key={platform} href={url} target="_blank" rel="noreferrer" aria-label={platform} style={{ color: 'var(--muted)', transition: 'color 0.2s', padding: '0.25rem' }} onMouseOver={e => e.currentTarget.style.color='var(--fg)'} onMouseOut={e => e.currentTarget.style.color='var(--muted)'}>
                    {Icon && <Icon />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Bottom Row: Copyright */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(161, 161, 170, 0.7)', margin: 0 }}>
              © {new Date().getFullYear()} {personal.name}
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
