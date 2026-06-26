import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'
import ExperienceItem from '../components/ExperienceItem'
export default function About({ data }) {
  const { personal, experience, github, stack } = data

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
