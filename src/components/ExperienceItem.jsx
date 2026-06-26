import { useState } from 'react'
import { ChevronIcon } from './Icons'

export default function ExperienceItem({ exp }) {
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
