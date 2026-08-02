import { socialIcons } from './Icons'

export default function Footer({ personal }) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <span>rudresh</span>
            <span style={{ color: 'var(--accent-muted)' }}>/</span>
          </div>

          <div className="footer-socials">
            {personal?.socialLinks && Object.entries(personal.socialLinks).map(([platform, url]) => {
              const Icon = socialIcons[platform]
              return (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon"
                  title={platform}
                >
                  {Icon && <Icon />}
                </a>
              )
            })}
          </div>
        </div>

        <div className="footer-bottom">
          <span>Keep moving forward, Dr. Senku.</span>
          <span>© {new Date().getFullYear()} {personal?.name || 'Rudresh Singh'}</span>
        </div>
      </div>
    </footer>
  )
}
