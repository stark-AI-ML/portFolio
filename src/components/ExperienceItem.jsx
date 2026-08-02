import { useState, useRef, useEffect } from 'react'
import { ChevronIcon } from './Icons'
import { animateAccordion } from '../lib/animations'

export default function ExperienceItem({ exp }) {
  const [open, setOpen] = useState(false)
  const descRef = useRef(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (descRef.current) {
      animateAccordion(descRef.current, open)
    }
  }, [open])

  return (
    <div className="experience-item">
      <div 
        className="experience-card" 
        onClick={() => setOpen(!open)} 
        role="button" 
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(!open)
          }
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div style={{ flex: 1 }}>
            <div className="experience-header">
              {exp.url ? (
                <a 
                  href={exp.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="experience-company" 
                  onClick={e => e.stopPropagation()}
                >
                  {exp.company}
                </a>
              ) : (
                <span className="experience-company">{exp.company}</span>
              )}
              <span className="experience-role-badge">{exp.type}</span>
            </div>
            <p className="experience-subtitle">{exp.role}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{exp.period}</span>
            <ChevronIcon expanded={open} />
          </div>
        </div>

        <div className="experience-meta">
          <span>{exp.location}</span>
          {exp.description && (
            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', opacity: 0.85 }}>
              {open ? 'Hide details' : 'View details'}
            </span>
          )}
        </div>

        {exp.description && (
          <div 
            ref={descRef} 
            className="experience-desc"
            style={{ display: 'none' }}
          >
            {exp.description}
          </div>
        )}
      </div>
    </div>
  )
}
