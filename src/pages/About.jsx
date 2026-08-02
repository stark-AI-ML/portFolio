import React, { useEffect, useRef } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'
import { initScrollObserver } from '../lib/animations'

export default function About({ data }) {
  const { personal, github, stack } = data
  const mainRef = useRef(null)

  useEffect(() => {
    if (!mainRef.current) return
    const cleanup = initScrollObserver(mainRef.current)
    return cleanup
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
    <main ref={mainRef} className="container" style={{ paddingBottom: '3rem', paddingTop: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>About Me</h1>
      </div>

      {/* Bio Paragraphs */}
      <section style={{ marginBottom: '2.5rem' }}>
        {personal.about && personal.about.map((paragraph, idx) => (
          <p key={idx} style={{ fontSize: '1rem', color: 'var(--muted-light)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            {paragraph}
          </p>
        ))}
      </section>

      {/* Technical Stack (Bento Grid) */}
      {stack && (
        <section className="reveal-on-scroll" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Technical Craft & Stack</h2>
          <div className="bento-grid" style={{ marginTop: '1rem' }}>
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

      {/* Open Source Contributions */}
      {github && github.showContributions && github.username && (
        <section className="reveal-on-scroll" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title">Open Source Contributions</h2>
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
