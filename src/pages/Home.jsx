import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { VerifiedBadge, EyeIcon, CalendarIcon, MailIcon, ResumeIcon, socialIcons, GithubIcon, ExternalLinkIcon, TechIcons } from '../components/Icons'
import ExperienceItem from '../components/ExperienceItem'

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const cls = status === 'Live' ? 'status-live' : status === 'WIP' ? 'status-wip' : 'status-beta'
  return <span className={`project-status ${cls}`}>{status === 'Live' && '• '}{status}</span>
}

/* ─── Project Card ─── */
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <a href={project.link} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
          <div className="project-image">
            {project.image ? (
              <img src={project.image} alt={project.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>{'</>'}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{project.name}</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {project.tech.map((t, i) => {
            const Icon = TechIcons[t]
            return Icon ? (
              <span key={i} title={t} className="tech-icon-link">
                <Icon />
              </span>
            ) : null
          })}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="project-link" aria-label="View Code" title="View Code" style={{ display: 'flex', alignItems: 'center' }}>
              <GithubIcon />
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link" aria-label="View Live Site" title="View Live Site" style={{ display: 'flex', alignItems: 'center' }}>
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
    <a href={project.link} target="_blank" rel="noreferrer" className="project-card featured-card">
      <div className="project-header">
        <span className="project-title" style={{ fontSize: '1rem' }}>{project.name}</span>
        <StatusBadge status={project.status} />
      </div>
      <p className="project-desc" style={{ WebkitLineClamp: 'unset', marginBottom: '1rem' }}>{project.description}</p>
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
      <div className="project-tech">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.tech.map((t, i) => {
            const Icon = TechIcons[t]
            return Icon ? (
              <span key={i} title={t} className="tech-icon-link">
                <Icon />
              </span>
            ) : null
          })}
        </div>
        <div className="project-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }} aria-label="View on GitHub" title="View on GitHub">
          <GithubIcon />
        </div>
      </div>
    </a>
  )
}

export default function Home({ data }) {
  const { personal, projects, github, writings, experience } = data

  const [currentBanner, setCurrentBanner] = useState(null)

  useEffect(() => {
    if (personal.bannerImages && personal.bannerImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * personal.bannerImages.length)
      setCurrentBanner(personal.bannerImages[randomIndex])
    } else if (personal.bannerImage) {
      setCurrentBanner(personal.bannerImage)
    }
  }, [personal.bannerImages, personal.bannerImage])

  const selectLast10Months = contributions => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 10;
    return contributions.filter(day => {
      const date = new Date(day.date);
      const monthDiff = currentMonth - date.getMonth() + (12 * (currentYear - date.getFullYear()));
      return monthDiff < shownMonths;
    });
  };

  return (
    <main className="container" style={{ paddingBottom: '0' }}>
      {/* ── Banner ── */}
      <div className="animate-in delay-1">
        <div className="hero-banner" key={currentBanner}>
          {currentBanner && <img src={currentBanner} alt="Banner" />}
        </div>
      </div>

      {/* ── Profile ── */}
      <div className="animate-in delay-2">
        <div className="hero-profile">
          <img src={personal.avatar} alt={personal.name} className="hero-avatar" />
          <div className="hero-info">
            <h1>
              {personal.name}
              <VerifiedBadge />
            </h1>
            <p>{personal.title}</p>
            {personal.profileViews > 0 && (
              <div className="hero-stats">
                <EyeIcon />
                <span><strong>{personal.profileViews}</strong> profile views</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
      <div className="animate-in delay-3">
        <div className="hero-desc">
          {personal.bio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* ── Action Buttons ── */}
        <div className="button-group">
          <a href="#projects" className="btn btn-primary">
            <CalendarIcon /> My Work
          </a>
          <a href={`mailto:${personal.email}`} className="btn btn-outline">
            <MailIcon /> Send an email
          </a>
        </div>

        {/* ── Social Pills ── */}
        <div className="social-links">
          {Object.entries(personal.socials).map(([platform, url]) => {
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

      {/* ── Experience Section ── */}
      {experience && experience.length > 0 && (
        <div className="animate-in delay-4" style={{ marginTop: '2.5rem' }}>
          <div className="border-t border-zinc-800 mb-5" style={{ borderTop: '1px solid var(--border)', marginBottom: '1.25rem' }}></div>
          <h2 className="section-title" style={{ marginTop: 0, marginBottom: '1.5rem' }}>Experience So Far</h2>
          <div className="experience-list">
            {experience.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} />
            ))}
          </div>
        </div>
      )}

      {/* ── GitHub Contributions ── */}
      {github && github.showContributions && github.username && (
        <div className="animate-in delay-5" style={{ marginTop: '2.5rem' }}>
          <div className="border-t border-zinc-800 mb-5" style={{ borderTop: '1px solid var(--border)', marginBottom: '1.25rem' }}></div>
          <h2 className="section-title" style={{ marginTop: 0, marginBottom: '1rem' }}>Contributions</h2>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', overflow: 'hidden' }}>
            <div style={{ width: 'max-content' }}>
              <GitHubCalendar 
                username={github.username} 
                transformData={selectLast10Months}
                colorScheme="dark"
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
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
        </div>
      )}

      {/* ── Writings ── */}
      {writings && writings.length > 0 && (
        <div className="animate-in delay-5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h2 className="section-title" style={{ borderTop: 'none', margin: 0, padding: 0 }}>Recent Writing</h2>
            <Link to="/blog" className="project-link" style={{ margin: 0 }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.25rem' }}>
            {writings.slice(0, 3).map((w, i) => (
              <a key={i} href={w.link} target="_blank" rel="noreferrer" className="project-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f4f4f5' }}>{w.title}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '0.2rem' }}>{w.platform} • {w.date}</p>
                </div>
                <div className="project-link" style={{ margin: 0 }}>Read →</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Projects ── */}
      <div className="animate-in delay-6" id="projects">
        <h2 className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Selected Work
        </h2>

        {/* Featured project */}
        {projects.length > 0 && projects[0].highlights && (
          <div className="animate-in delay-7" style={{ marginBottom: '1.25rem' }}>
            <FeaturedCard project={projects[0]} />
          </div>
        )}

        {/* Other projects */}
        <div className="projects-grid">
          {projects.slice(1).map((proj) => (
            <div key={proj.id} className="animate-in delay-8">
              <ProjectCard project={proj} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
