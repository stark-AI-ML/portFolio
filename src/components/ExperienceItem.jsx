import React, { useState, useRef } from 'react'
import { ChevronIcon } from './Icons'
import { animateAccordion } from '../lib/animations'

export default function ExperienceItem({ exp }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  const toggleOpen = () => {
    const nextState = !open
    setOpen(nextState)
    if (bodyRef.current) {
      animateAccordion(bodyRef.current, nextState)
    }
  }

  return (
    <div className="experience-item">
      <div 
        className="experience-header-row" 
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleOpen()
          }
        }}
      >
        <div className="experience-logo">
          {exp.logo ? (
            <img src={exp.logo} alt={exp.company} />
          ) : (
            <span>{exp.company ? exp.company[0] : 'E'}</span>
          )}
        </div>

        <div className="experience-info">
          <div className="experience-title-row">
            {exp.url ? (
              <a 
                href={exp.url} 
                target="_blank" 
                rel="noreferrer" 
                className="experience-company"
                onClick={(e) => e.stopPropagation()}
              >
                {exp.company}
              </a>
            ) : (
              <span className="experience-company">{exp.company}</span>
            )}
            {exp.type && <span className="experience-tag">{exp.type}</span>}
          </div>
          <div className="experience-role">{exp.role}</div>
        </div>

        <div className="experience-meta">
          <span className="experience-date">{exp.period}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
            <span className="experience-location">{exp.location}</span>
            <ChevronIcon expanded={open} />
          </div>
        </div>
      </div>

      {exp.description && (
        <div 
          ref={bodyRef}
          className="experience-body" 
          style={{ display: open ? 'block' : 'none' }}
        >
          <p>{exp.description}</p>
        </div>
      )}
    </div>
  )
}
