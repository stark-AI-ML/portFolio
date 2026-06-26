import { GitHubCalendar } from 'react-github-calendar'
import { useState } from 'react'
import { ChevronIcon } from '../components/Icons'

/* ─── Experience Item ─── */
function ExperienceItem({ exp }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="experience-item" style={{ flexDirection: 'column', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', width: '100%' }} onClick={() => setOpen(!open)} role="button" tabIndex={0}>
        <div className="experience-logo">
          {exp.logo ? <img src={exp.logo} alt={exp.company} /> : <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '1.1rem' }}>{exp.company[0]}</span>}
        </div>
        <div className="experience-info">
          <div className="experience-header">
            {exp.url ? (
              <a href={exp.url} target="_blank" rel="noreferrer" className="experience-company" onClick={e => e.stopPropagation()}>{exp.company}</a>
            ) : (
              <span className="experience-company">{exp.company}</span>
            )}
            <span className="experience-role">{exp.type}</span>
          </div>
          <p className="experience-subtitle">{exp.role}</p>
        </div>
        <div className="experience-meta">
          <p className="experience-date">{exp.period}</p>
          <p className="experience-location">{exp.location}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
            <ChevronIcon expanded={open} />
          </div>
        </div>
      </div>
      {open && exp.description && (
        <div style={{ paddingLeft: '3.5rem', paddingTop: '0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{exp.description}</p>
        </div>
      )}
    </div>
  )
}

export default function About({ data }) {
  const { personal, experience, github, stack } = data

  return (
    <main className="container" style={{ paddingBottom: '0' }}>
      <div className="animate-in delay-1">
        <h1 className="text-2xl font-bold text-foreground" style={{ fontSize: '2rem', marginBottom: '1.5rem', marginTop: '1rem' }}>About</h1>
      </div>

      <div className="animate-in delay-2">
        <section style={{ marginBottom: '2.5rem' }}>
          {personal.about && personal.about.map((paragraph, idx) => (
            <p key={idx} style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </section>
      </div>

      {github && github.showContributions && github.username && (
        <div className="animate-in delay-3" style={{ marginBottom: '2.5rem' }}>
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

      {experience && experience.length > 0 && (
        <div className="animate-in delay-4" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ marginTop: 0 }}>Experience So Far</h2>
          <div className="experience-list">
            {experience.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} />
            ))}
          </div>
        </div>
      )}

      {stack && (
        <div className="animate-in delay-5" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ marginTop: 0 }}>Stack & Tools</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '0.75rem', fontWeight: 600 }}>Languages</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {stack.languages.map((item, i) => (
                  <span key={i} className="social-link" style={{ fontSize: '12px', padding: '0.4rem 0.8rem' }}>{item}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '0.75rem', fontWeight: 600 }}>Frameworks</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {stack.frameworks.map((item, i) => (
                  <span key={i} className="social-link" style={{ fontSize: '12px', padding: '0.4rem 0.8rem' }}>{item}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '0.75rem', fontWeight: 600 }}>Tools</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {stack.tools.map((item, i) => (
                  <span key={i} className="social-link" style={{ fontSize: '12px', padding: '0.4rem 0.8rem' }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
