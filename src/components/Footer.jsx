import { socialIcons } from './Icons'

export default function Footer({ personal }) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <span>rudresh</span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <p className="footer-quote">
              &ldquo;Keep moving forward, Dr. Senku.&rdquo;
            </p>
          </div>

          <div className="footer-socials">
            {personal?.socials && Object.entries(personal.socials).map(([platform, url]) => {
              const Icon = socialIcons[platform]
              return (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={platform} 
                  className="footer-social-icon"
                >
                  {Icon && <Icon />}
                </a>
              )
            })}
          </div>
        </div>

        <div className="footer-bottom">
          <span>{personal?.name || 'Rudresh Singh'}</span>
          <span>© {new Date().getFullYear()} · All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
