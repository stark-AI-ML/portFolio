import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { 
  VerifiedBadge, 
  ExternalLinkIcon, 
  GithubIcon, 
  socialIcons, 
  TechIcons 
} from '../components/Icons'

export default function Home({ data }) {
  const { personal, projects, writings, technicalStack } = data
  const [visitorLocation, setVisitorLocation] = useState(null)
  const [profileViews, setProfileViews] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Non-blocking fetch for visitor location if backend is present
    fetch('http://localhost:5001/api/visitor')
      .then(res => res.json())
      .then(data => {
        if (data && data.location) setVisitorLocation(data.location)
      })
      .catch(() => {}) // Silent fail if backend is offline

    // Non-blocking fetch for profile views if available
    fetch('http://localhost:5001/api/views')
      .then(res => res.json())
      .then(data => {
        if (data && data.views) setProfileViews(data.views)
      })
      .catch(() => {
        setProfileViews(personal.profileViews || 124)
      })
  }, [personal.profileViews])

  const bannerImg = personal.bannerImages && personal.bannerImages.length > 0 
    ? personal.bannerImages[0] 
    : '/space_banner.png'

  return (
    <div className="container" ref={containerRef}>
      {/* 1. Classic v2 Banner with Organic Fade */}
      <div className="banner-container">
        <img 
          src={bannerImg} 
          alt="Banner cover" 
          loading="eager"
        />
      </div>

      {/* 2. Hero Profile */}
      <div className="hero-profile">
        <div className="hero-avatar-wrapper">
          <img 
            src={personal.avatar} 
            alt={personal.name} 
            className="hero-avatar" 
          />
        </div>
        <div className="hero-info">
          <div className="hero-name-title">
            <h1>
              {personal.name}
              <VerifiedBadge />
            </h1>
            <div className="hero-title-text">
              {personal.title}
            </div>
            <div className="hero-status-row">
              <span className="live-indicator">
                <span className="live-dot"></span>
                <span>Open to opportunities</span>
              </span>
              {profileViews && (
                <span className="profile-views">
                  • {profileViews} views
                </span>
              )}
              {visitorLocation && (
                <span className="profile-views">
                  • viewing from {visitorLocation}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hero Bio */}
      <div className="hero-bio">
        <p>{personal.bio}</p>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
          Focused on distributed architectures, high-throughput message queues, database internals, and systems optimization.
        </p>
      </div>

      {/* 4. Action Buttons */}
      <div className="button-group">
        <a href="#projects" className="btn btn-primary">
          <span>// View Work</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
        <a href={`mailto:${personal.email}`} className="btn btn-outline">
          <span>// Contact Me</span>
          <ExternalLinkIcon />
        </a>
      </div>

      {/* 5. Social Links */}
      <div className="social-links">
        {personal.socialLinks && Object.entries(personal.socialLinks).map(([platform, url]) => {
          const Icon = socialIcons[platform]
          return (
            <a 
              key={platform} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              {Icon && <Icon />}
              <span>{platform}</span>
            </a>
          )
        })}
      </div>

      {/* 6. RESTORED PRE-PROJECT SECTION: ABOUT & CURRENT FOCUS */}
      <div className="focus-section">
        <div className="focus-header">
          <span className="focus-title">// About & Architecture Focus</span>
          <span className="focus-tag">Active Systems Exploration</span>
        </div>
        <div className="focus-content">
          <p>
            I am a backend engineer dedicated to building resilient distributed systems, data processing pipelines, and high-performance services. My core focus centers on designing architectures that remain dependable under extreme scale and volatile workloads.
          </p>
          <p>
            Currently researching low-latency concurrency models, asynchronous execution engines, and distributed storage internals. When not architecting infrastructure, I study distributed systems papers and explore efficient local ML model serving.
          </p>
        </div>
      </div>

      {/* 7. Selected Projects */}
      <div className="section-header" id="projects">
        <div className="section-title">
          <span className="prefix">//</span>
          <span>Selected Projects</span>
        </div>
        <div className="section-divider"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => {
          const isFeatured = index === 0

          return (
            <div 
              key={project.id || index} 
              className={`project-card ${isFeatured ? 'featured-card' : ''}`}
              style={isFeatured ? { gridColumn: '1 / -1' } : {}}
            >
              <div className="project-top">
                <div className="project-header">
                  <span className="project-title">{project.name}</span>
                  {project.status && (
                    <span className={`project-status ${
                      project.status.toLowerCase().includes('live') ? 'status-live' :
                      project.status.toLowerCase().includes('wip') ? 'status-wip' : 'status-beta'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="project-desc">{project.description}</p>

                {/* Project Image */}
                {project.image && (
                  <div className="project-image" style={{ marginTop: '0.85rem' }}>
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Featured Highlights */}
                {isFeatured && project.highlights && (
                  <div className="featured-highlights">
                    {project.highlights.slice(0, 4).map((highlight, hIdx) => (
                      <div key={hIdx} className="highlight-item">
                        <span className="highlight-bullet">▸</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Tech & Links */}
              <div className="project-tech">
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {project.tech && project.tech.map((techName, tIdx) => {
                    const TechIcon = TechIcons[techName]
                    return TechIcon ? (
                      <span key={tIdx} title={techName} className="tech-icon-link">
                        <TechIcon />
                      </span>
                    ) : (
                      <span key={tIdx} className="mono" style={{ fontSize: '0.725rem', color: 'var(--muted)' }}>
                        {techName}
                      </span>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      title="View GitHub Repository"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      title="View Live Demo / Docs"
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 8. Technical Stack & Infrastructure */}
      {technicalStack && (
        <>
          <div className="section-header">
            <div className="section-title">
              <span className="prefix">//</span>
              <span>Technical Craft</span>
            </div>
            <div className="section-divider"></div>
          </div>

          <div className="stack-grid">
            {Object.entries(technicalStack).map(([category, items]) => (
              <div key={category} className="stack-card">
                <span className="stack-title">{category}</span>
                <div className="stack-tags">
                  {items.map((tech, idx) => (
                    <span key={idx} className="stack-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 9. Writings & Articles */}
      {writings && writings.length > 0 && (
        <>
          <div className="section-header">
            <div className="section-title">
              <span className="prefix">//</span>
              <span>Selected Writings</span>
            </div>
            <div className="section-divider"></div>
            <Link to="/blog" className="mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              view all →
            </Link>
          </div>

          <div className="writings-list">
            {writings.slice(0, 3).map((article, idx) => (
              <a 
                key={idx} 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="writing-row"
              >
                <div>
                  <div className="writing-title">{article.title}</div>
                  <div className="writing-meta">{article.platform} • {article.date}</div>
                </div>
                <span className="writing-arrow">→</span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* 10. Engineering Activity (GitHub Contributions) */}
      <div className="section-header">
        <div className="section-title">
          <span className="prefix">//</span>
          <span>GitHub Activity</span>
        </div>
        <div className="section-divider"></div>
      </div>

      <div style={{ 
        background: 'var(--surface)', 
        border: '1px solid var(--border)', 
        borderRadius: 'var(--radius-sm)', 
        padding: '1.25rem',
        overflowX: 'auto' 
      }}>
        <GitHubCalendar
          username={personal.githubUsername || 'RudreshSingh'}
          colorScheme="dark"
          theme={{
            dark: ['#16161b', '#1e293b', '#334155', '#475569', '#6366f1']
          }}
          fontSize={12}
          blockSize={11}
          blockMargin={4}
          renderBlock={(block, activity) =>
            React.cloneElement(block, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': `${activity.count} contributions on ${activity.date}`
            })
          }
        />
        <Tooltip id="react-tooltip" />
      </div>
    </div>
  )
}
