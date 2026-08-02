import React, { useEffect } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'
import ExperienceItem from '../components/ExperienceItem'
import { TechIcons } from '../components/Icons'
import { initScrollObserver } from '../lib/animations'

export default function About({ data }) {
  const { personal, experience, github, stack } = data

  useEffect(() => {
    const cleanup = initScrollObserver()
    return () => {
      if (cleanup) cleanup()
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
    <main className="container" style={{ paddingBottom: '0', paddingTop: '2rem' }}>
      <h1 style={{ fontSize: '2.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--fg-heading)' }}>
        About
      </h1>

      {/* ── About Narrative ── */}
      <section className="reveal-on-scroll is-revealed" style={{ marginBottom: '3rem' }}>
        {personal.about && personal.about.map((paragraph, idx) => (
          <p key={idx} style={{ fontSize: '1.025rem', color: 'var(--muted-light)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            {paragraph}
          </p>
        ))}
      </section>

      {/* ── Experience So Far ── */}
      {experience && experience.length > 0 && (
        <section className="reveal-on-scroll" style={{ marginBottom: '3.25rem' }}>
          <h2 className="section-title" style={{ marginTop: 0 }}>Experience So Far</h2>
          <div className="experience-list">
            {experience.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} />
            ))}
          </div>
        </section>
      )}

      {/* ── Contributions ── */}
      {github && github.showContributions && github.username && (
        <section className="reveal-on-scroll" style={{ marginBottom: '3.25rem' }}>
          <h2 className="section-title" style={{ marginTop: 0, marginBottom: '1.25rem' }}>Contributions</h2>
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

      {/* ── Stack & Tools ── */}
      {stack && (
        <section className="reveal-on-scroll" style={{ marginBottom: '3.25rem' }}>
          <h2 className="section-title" style={{ marginTop: 0 }}>Stack & Tools</h2>
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
