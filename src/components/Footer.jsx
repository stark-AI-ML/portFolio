import { socialIcons } from './Icons'

export default function Footer({ personal }) {
  return (
    <footer className="container">
      <div className="footer">
        <div className="footer-left">
          <span className="footer-brand">
            rs<span className="brand-dot">.</span>
          </span>
          <span className="footer-tagline">"Keep moving forward, Dr. Senku."</span>
          <span className="footer-copyright">
            © {new Date().getFullYear()} {personal?.name || 'Rudresh Singh'}. All rights reserved.
          </span>
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
                title={platform}
                aria-label={platform}
              >
                {Icon && <Icon />}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
