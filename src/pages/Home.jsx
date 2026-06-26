import { Link } from 'react-router-dom'
import { GitHubCalendar } from 'react-github-calendar'
import { VerifiedBadge, EyeIcon, CalendarIcon, MailIcon, ResumeIcon, socialIcons } from '../components/Icons'

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {project.tech.slice(0, 5).map((t, i) => (
            <span key={i} className="tech-tag" title={t}>
              <span className={`tech-dot ${t.toLowerCase().replace(/[.\s]/g, '')}`} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--muted)', display: 'inline-block' }} />
              {t}
            </span>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="project-link">Code →</a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link">View →</a>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.tech.map((t, i) => (
            <span key={i} className="tech-tag" title={t}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--muted)', display: 'inline-block' }} />
              {t}
            </span>
          ))}
        </div>
        <span className="project-link" style={{ marginLeft: 'auto' }}>View on GitHub →</span>
      </div>
    </a>
  )
}

export default function Home({ data }) {
  const { personal, projects, github, writings } = data

  return (
    <main className="container" style={{ paddingBottom: '0' }}>
      {/* ── Banner ── */}
      <div className="animate-in delay-1">
        <div className="hero-banner">
          {personal.bannerImage && <img src={personal.bannerImage} alt="Banner" />}
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

      {/* ── GitHub Contributions ── */}
      {github && github.showContributions && github.username && (
        <div className="animate-in delay-4" style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title" style={{ marginTop: 0 }}>Contributions</h2>
          <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '0.75rem', border: '1px solid var(--border)', overflowX: 'auto' }}>
            <GitHubCalendar 
              username={github.username} 
              colorScheme="dark"
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              fontSize={12}
              blockSize={12}
            />
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
