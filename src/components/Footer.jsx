import { MailIcon, socialIcons } from './Icons'

export default function Footer({ personal }) {
  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 1.5rem' }}>
      <footer className="footer">
        <div className="footer-left">
          <p className="footer-name">{personal.name}</p>
          <p className="footer-tagline">Building systems that scale.</p>
          <p className="footer-copyright">© {new Date().getFullYear()} {personal.name}</p>
        </div>
        <div className="footer-socials">
          {Object.entries(personal.socials).map(([platform, url]) => {
            const Icon = socialIcons[platform]
            return (
              <a key={platform} href={url} target="_blank" rel="noreferrer" aria-label={platform}>
                {Icon && <Icon />}
              </a>
            )
          })}
          <a href={`mailto:${personal.email}`} aria-label="Email">
            <MailIcon />
          </a>
        </div>
      </footer>
    </div>
  )
}
