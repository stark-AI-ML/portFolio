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
import { animateHeroEntrance, initScrollObserver } from '../lib/animations'

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const cls = status === 'Live' ? 'status-live' : status === 'WIP' ? 'status-wip' : 'status-beta'
  return <span className={`project-status ${cls}`}>{status === 'Live' && '• '}{status}</span>
}

/* ─── Project Card ─── */
function ProjectCard({ project }) {
  return (
    <div className="project-card reveal-on-scroll">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <a 
          href={project.links?.live || project.links?.github || '#'} 
          target="_blank" 
          rel="noreferrer" 
          style={{ display: 'block' }}
        >
          <div className="project-image">
            {project.image ? (
              <img src={project.image} alt={project.name} />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#18181f' }}>
                <span className="mono" style={{ fontSize: '1.25rem', color: 'var(--accent)', opacity: 0.6 }}>{'</>'}</span>
                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.35rem' }}>{project.name}</span>
              </div>
            )}
          </div>
        </a>
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
              <span key={i} className="mono" style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
                {t}
              </span>
            )
          })}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="project-link" aria-label="View Source Code" title="View Source Code">
              <GithubIcon />
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link" aria-label="View Live Project" title="View Live Project">
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
    <div className="project-card featured-card reveal-on-scroll">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a 
          href={project.links?.live || project.links?.github || '#'} 
          target="_blank" 
          rel="noreferrer" 
          style={{ display: 'block' }}
        >
          <div className="project-image" style={{ aspectRatio: '21 / 9' }}>
            {project.image ? (
              <img src={project.image} alt={project.name} />
            ) : null}
          </div>
        </a>

        <div>
          <div className="project-header">
            <span className="project-title" style={{ fontSize: '1.2rem' }}>{project.name}</span>
            <StatusBadge status={project.status} />
          </div>
          <p className="project-desc" style={{ marginTop: '0.4rem', marginBottom: '0.85rem', color: 'var(--muted-light)' }}>
            {project.description}
          </p>
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
      </div>

      <div className="project-tech" style={{ marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.tech && project.tech.map((t, i) => {
            const Icon = TechIcons[t]
            return Icon ? (
              <span key={i} title={t} className="tech-icon-link">
                <Icon />
              </span>
            ) : (
              <span key={i} className="mono" style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
                {t}
              </span>
            )
          })}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="project-link" aria-label="View Source Code" title="View Source Code">
              <GithubIcon />
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link" aria-label="View Live Project" title="View Live Project">
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home({ data }) {
  const { personal, projects, github, writings, stack } = data
  const mainRef = useRef(null)

  const [currentBanner, setCurrentBanner] = useState(null)

  useEffect(() => {
    if (personal.bannerImages && personal.bannerImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * personal.bannerImages.length)
      setCurrentBanner(personal.bannerImages[randomIndex])
    } else if (personal.bannerImage) {
      setCurrentBanner(personal.bannerImage)
    }
  }, [personal.bannerImages, personal.bannerImage])

  // Trigger Anime.js entrance timeline & scroll observer
  useEffect(() => {
    if (!mainRef.current) return
    const heroTl = animateHeroEntrance(mainRef.current)
    const cleanupScroll = initScrollObserver(mainRef.current)

    return () => {
      if (heroTl && heroTl.pause) heroTl.pause()
      if (cleanupScroll) cleanupScroll()
    }
  }, [])

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
    <main ref={mainRef} className="container" style={{ paddingBottom: '0', paddingTop: '1.25rem' }}>
      {/* ── Hero Banner ── */}
      <div>
        <div className="hero-banner" key={currentBanner}>
          {currentBanner && <img src={currentBanner} alt="Banner" />}
          <div className="shooting-star star-1"></div>
          <div className="shooting-star star-2"></div>
        </div>
      </div>

      {/* ── Profile & Info ── */}
      <div>
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
            
            <div className="availability-badge">
              <span className="pulse-dot"></span>
              <span>Open to opportunities</span>
            </div>

            {personal.profileViews > 0 && (
              <div className="hero-stats">
                <EyeIcon />
                <span>{personal.profileViews} profile views</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bio & CTAs ── */}
      <div>
        <div className="hero-desc">
          {personal.bio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
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
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            )
          })}
          {personal.resumePdf && (
            <a href={personal.resumePdf} target="_blank" rel="noreferrer" download className="social-link">
              <ResumeIcon /> Resume
            </a>
          )}
        </div>
      </div>

      {/* ── Selected Projects ── */}
      {projects && projects.length > 0 && (
        <section className="reveal-on-scroll" id="projects" style={{ marginTop: '2.5rem' }}>
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

      {/* ── Technical Stack (Bento Grid) ── */}
      {stack && (
        <section className="reveal-on-scroll" style={{ marginTop: '3rem' }}>
          <h2 className="section-title">Technical Craft & Infrastructure</h2>
          <div className="bento-grid">
            {stack.languages && (
              <div className="bento-card">
                <span className="bento-title">Languages</span>
                <div className="bento-tags">
                  {stack.languages.map((item, i) => (
                    <span key={i} className="bento-pill">{item}</span>
                  ))}
                </div>
              </div>
            )}

            {stack.frameworks && (
              <div className="bento-card">
                <span className="bento-title">Frameworks & APIs</span>
                <div className="bento-tags">
                  {stack.frameworks.map((item, i) => (
                    <span key={i} className="bento-pill">{item}</span>
                  ))}
                </div>
              </div>
            )}

            {stack.tools && (
              <div className="bento-card">
                <span className="bento-title">Systems & Infrastructure</span>
                <div className="bento-tags">
                  {stack.tools.map((item, i) => (
                    <span key={i} className="bento-pill">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Writings & Articles ── */}
      {writings && writings.length > 0 && (
        <section className="reveal-on-scroll" style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Articles & Notes</h2>
            <Link to="/blog" className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>
              View all →
            </Link>
          </div>
          <div className="writings-list">
            {writings.slice(0, 3).map((w, i) => (
              <a key={i} href={w.link} target="_blank" rel="noreferrer" className="writing-row">
                <div>
                  <div className="writing-title">{w.title}</div>
                  <div className="writing-meta">{w.platform} · {w.date}</div>
                </div>
                <div className="writing-arrow">→</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── Engineering Activity (GitHub Contributions) ── */}
      {github && github.showContributions && github.username && (
        <section className="reveal-on-scroll" style={{ marginTop: '3rem', marginBottom: '1rem' }}>
          <h2 className="section-title">Engineering Activity</h2>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', overflow: 'hidden', padding: '1rem 0' }}>
            <div style={{ width: 'max-content' }}>
              <GitHubCalendar 
                username={github.username} 
                transformData={selectLast10Months}
                colorScheme="dark"
                theme={{
                  light: ['#18181f', '#27272a', '#3f3f46', '#f59e0b', '#fbbf24'],
                  dark: ['#131317', '#27272a', '#3f3f46', '#d97706', '#f59e0b'],
                }}
                fontSize={12}
                blockSize={12}
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
    </main>
  )
}
