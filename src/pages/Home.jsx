import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { 
  VerifiedBadge, 
  EyeIcon, 
  CalendarIcon, 
  MailIcon, 
  ResumeIcon, 
  socialIcons, 
  GithubIcon, 
  ExternalLinkIcon, 
  TechIcons 
} from '../components/Icons'
import ExperienceItem from '../components/ExperienceItem'
import { animateHeroEntrance, initScrollObserver } from '../lib/animations'

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const s = status ? status.toLowerCase() : ''
  const cls = s.includes('live') ? 'status-live' : s.includes('wip') ? 'status-wip' : 'status-beta'
  return <span className={`project-status ${cls}`}>{s.includes('live') && '• '}{status}</span>
}

/* ─── Project Card ─── */
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {project.image ? (
          <a 
            href={project.links?.live || project.links?.github || project.link} 
            target="_blank" 
            rel="noreferrer" 
            style={{ display: 'block' }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.name} loading="lazy" />
            </div>
          </a>
        ) : null}

        <div>
          <div className="project-header">
            <span className="project-title">{project.name}</span>
            <StatusBadge status={project.status} />
          </div>
          <p className="project-desc">{project.description}</p>
        </div>
      </div>

      <div className="project-tech">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {project.tech && project.tech.map((t, i) => {
            const Icon = TechIcons[t]
            return Icon ? (
              <span key={i} title={t} className="tech-icon-link">
                <Icon />
              </span>
            ) : (
              <span key={i} className="mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                {t}
              </span>
            )
          })}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          {project.links?.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noreferrer" 
              className="project-link" 
              aria-label="View Code" 
              title="View Code"
            >
              <GithubIcon />
            </a>
          )}
          {project.links?.live && (
            <a 
              href={project.links.live} 
              target="_blank" 
              rel="noreferrer" 
              className="project-link" 
              aria-label="View Live Site" 
              title="View Live Site"
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Featured Project Card ─── */
function FeaturedCard({ project }) {
  return (
    <div className="project-card featured-card">
      <div>
        <div className="project-header">
          <span className="project-title" style={{ fontSize: '1.15rem' }}>{project.name}</span>
          <StatusBadge status={project.status} />
        </div>
        <p className="project-desc" style={{ marginTop: '0.45rem', marginBottom: '0.95rem' }}>
          {project.description}
        </p>

        {project.image && (
          <div className="project-image" style={{ marginBottom: '1.1rem' }}>
            <img src={project.image} alt={project.name} loading="lazy" />
          </div>
        )}

        {project.highlights && (
          <div className="featured-highlights">
            {project.highlights.map((h, i) => (
              <div key={i} className="highlight-item">
                <span className="highlight-bullet">▸</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="project-tech">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.tech && project.tech.map((t, i) => {
            const Icon = TechIcons[t]
            return Icon ? (
              <span key={i} title={t} className="tech-icon-link">
                <Icon />
              </span>
            ) : null
          })}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          {project.links?.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noreferrer" 
              className="project-link" 
              aria-label="View Code" 
              title="View Code"
            >
              <GithubIcon />
            </a>
          )}
          {project.links?.live && (
            <a 
              href={project.links.live} 
              target="_blank" 
              rel="noreferrer" 
              className="project-link" 
              aria-label="View Live Site" 
              title="View Live Site"
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home({ data }) {
  const { personal, projects, github, writings, experience, stack } = data || {}

  const [currentBanner, setCurrentBanner] = useState(null)
  const hasTrackedRef = useRef(false)
  const [profileViews, setProfileViews] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_views')
      if (saved) return parseInt(saved, 10)
    }
    return personal?.profileViews || 142
  })

  useEffect(() => {
    if (personal.bannerImages && personal.bannerImages.length > 0) {
      setCurrentBanner(personal.bannerImages[0])
    } else if (personal.bannerImage) {
      setCurrentBanner(personal.bannerImage)
    }

    // 1. Strictly increment view counter by +1 once per load/session
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true
      const saved = localStorage.getItem('portfolio_views')
      const currentVal = saved ? parseInt(saved, 10) : (personal.profileViews || 142)
      const nextVal = currentVal + 1
      localStorage.setItem('portfolio_views', String(nextVal))
      setProfileViews(nextVal)
    }

    // 2. Secretly log recruiter & visitor info locally to localStorage without displaying on UI
    fetch('https://ipwho.is/')
      .then(res => res.json())
      .then(d => {
        if (d && d.success) {
          try {
            const rawLogs = localStorage.getItem('recruiter_visitor_logs')
            const logs = rawLogs ? JSON.parse(rawLogs) : []
            const newLog = {
              timestamp: new Date().toISOString(),
              ip: d.ip,
              city: d.city,
              region: d.region,
              country: d.country,
              isp: d.connection?.isp || d.connection?.org || 'Unknown'
            }
            // Keep the last 50 visitor records
            const updatedLogs = [newLog, ...logs.slice(0, 49)]
            localStorage.setItem('recruiter_visitor_logs', JSON.stringify(updatedLogs))
          } catch (e) {
            // Ignore storage errors
          }
        }
      })
      .catch(() => {
        // Silently ignore if offline
      })

    // Expose helper to view logs in browser console: window.getVisitorLogs()
    if (typeof window !== 'undefined') {
      window.getVisitorLogs = () => {
        const raw = localStorage.getItem('recruiter_visitor_logs')
        const data = raw ? JSON.parse(raw) : []
        console.table(data)
        return data
      }
    }

    // Trigger entrance animation & scroll observers
    animateHeroEntrance()
    const cleanupObserver = initScrollObserver()
    return () => {
      if (cleanupObserver) cleanupObserver()
    }
  }, [personal.bannerImages, personal.bannerImage, personal.profileViews])

  const selectLast10Months = contributions => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const shownMonths = 10
    return contributions.filter(day => {
      const date = new Date(day.date)
      const monthDiff = currentMonth - date.getMonth() + 12 * (currentYear - date.getFullYear())
      return monthDiff < shownMonths
    })
  }

  return (
    <main className="container">
      {/* ── 1. Hero Banner with Smooth Wandering Space & Multi-Layered Comets ── */}
      <div className="hero-banner">
        <div className="hero-banner-inner">
          {currentBanner && <img src={currentBanner} alt="Hero Banner" />}
        </div>

        {/* Ambient Multi-Layered Comets */}
        <div className="shooting-star star-1"></div>
        <div className="shooting-star star-2"></div>
        <div className="shooting-star star-3"></div>
        <div className="shooting-star star-4"></div>
      </div>

      {/* ── 2. Hero Profile & Header ── */}
      <div className="hero-profile">
        <div className="hero-avatar-wrapper">
          <img src={personal.avatar} alt={personal.name} className="hero-avatar" />
        </div>
        <div className="hero-info">
          <div className="hero-name-title">
            <h1>
              {personal.name}
              <VerifiedBadge />
            </h1>
            <p className="hero-title-text">{personal.title}</p>
          </div>

          <div className="hero-status-row">
            <span className="live-indicator">
              <span className="live-dot"></span>
              <span>Open to opportunities</span>
            </span>

            {profileViews && (
              <span className="hero-stats">
                <EyeIcon />
                <span>{profileViews} views</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. Hero Bio & Actions ── */}
      <div className="hero-desc">
        {Array.isArray(personal.bio) ? (
          personal.bio.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>{personal.bio}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <a href="#projects" className="btn btn-primary">
          <CalendarIcon /> Selected Work
        </a>
        <a href={`mailto:${personal.email || 'rslikefoot00@gmail.com'}`} className="btn btn-outline">
          <MailIcon /> Send an email
        </a>
      </div>

      {/* Social Links */}
      <div className="social-links">
        {personal.socials && Object.entries(personal.socials).map(([platform, url]) => {
          const Icon = socialIcons[platform]
          return (
            <a key={platform} href={url} target="_blank" rel="noreferrer" className="social-link">
              {Icon && <Icon />}
              <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </a>
          )
        })}
        {personal.resumePdf && (
          <a href={personal.resumePdf} target="_blank" rel="noreferrer" download className="social-link">
            <ResumeIcon />
            <span>Resume</span>
          </a>
        )}
      </div>

      {/* ── 4. Experience Section ── */}
      {experience && experience.length > 0 && (
        <section className="reveal-on-scroll" style={{ marginTop: '3.25rem' }}>
          <h2 className="section-title">Experience So Far</h2>
          <div className="experience-list">
            {experience.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} />
            ))}
          </div>
        </section>
      )}

      {/* ── 5. GitHub Contributions Graph ── */}
      {github && github.showContributions && github.username && (
        <section className="reveal-on-scroll" style={{ marginTop: '3.25rem' }}>
          <h2 className="section-title">Contributions</h2>
          <div style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius-xs)', 
            padding: '1.35rem', 
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ width: 'max-content' }}>
              <GitHubCalendar 
                username={github.username} 
                transformData={selectLast10Months}
                colorScheme="dark"
                theme={{
                  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                renderBlock={(block, activity) => 
                  React.cloneElement(block, {
                    'data-tooltip-id': 'react-tooltip',
                    'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                  })
                }
              />
              <Tooltip id="react-tooltip" />
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Selected Writings ── */}
      {writings && writings.length > 0 && (
        <section className="reveal-on-scroll" style={{ marginTop: '3.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Recent Writing</h2>
            <Link to="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)' }}>
              View all →
            </Link>
          </div>

          <div className="writings-list">
            {writings.slice(0, 3).map((w, i) => (
              <a key={i} href={w.link} target="_blank" rel="noreferrer" className="writing-row">
                <div>
                  <div className="writing-title">{w.title}</div>
                  <div className="writing-meta">{w.platform} • {w.date}</div>
                </div>
                <span className="writing-arrow">→</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. Selected Projects ── */}
      {projects && projects.length > 0 && (
        <section id="projects" className="reveal-on-scroll" style={{ marginTop: '3.25rem' }}>
          <h2 className="section-title">Selected Work</h2>

          {/* Featured Project */}
          {projects[0] && (
            <div style={{ marginBottom: '1.25rem' }}>
              <FeaturedCard project={projects[0]} />
            </div>
          )}

          {/* Other Projects Grid */}
          <div className="projects-grid">
            {projects.slice(1).map((proj) => (
              <ProjectCard key={proj.id || proj.name} project={proj} />
            ))}
          </div>
        </section>
      )}

      {/* ── 8. Technical Stack & Infrastructure ── */}
      {stack && (
        <section className="reveal-on-scroll" style={{ marginTop: '3.25rem' }}>
          <h2 className="section-title">Stack & Tools</h2>
          <div className="tech-stack-container">
            {stack.languages && (
              <div className="tech-category-card">
                <div className="tech-category-header">
                  <span className="tech-category-title">01 / Core Languages</span>
                  <span className="tech-category-count">{stack.languages.length} technologies</span>
                </div>
                <div className="tech-chips-grid">
                  {stack.languages.map((item, i) => {
                    const Icon = TechIcons[item]
                    return (
                      <div key={i} className="tech-chip">
                        {Icon && <Icon />}
                        <span>{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {stack.frameworks && (
              <div className="tech-category-card">
                <div className="tech-category-header">
                  <span className="tech-category-title">02 / Frameworks & Systems</span>
                  <span className="tech-category-count">{stack.frameworks.length} technologies</span>
                </div>
                <div className="tech-chips-grid">
                  {stack.frameworks.map((item, i) => {
                    const Icon = TechIcons[item]
                    return (
                      <div key={i} className="tech-chip">
                        {Icon && <Icon />}
                        <span>{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {stack.tools && (
              <div className="tech-category-card">
                <div className="tech-category-header">
                  <span className="tech-category-title">03 / Infrastructure & Data</span>
                  <span className="tech-category-count">{stack.tools.length} technologies</span>
                </div>
                <div className="tech-chips-grid">
                  {stack.tools.map((item, i) => {
                    const Icon = TechIcons[item]
                    return (
                      <div key={i} className="tech-chip">
                        {Icon && <Icon />}
                        <span>{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
