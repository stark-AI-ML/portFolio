import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'

export default function About({ data }) {
  const { personal, technicalStack, openSource } = data

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginTop: 0 }}>
        <div className="section-title">
          <span className="prefix">//</span>
          <span>About & Engineering Philosophy</span>
        </div>
        <div className="section-divider"></div>
      </div>

      <div style={{ 
        background: 'var(--surface)', 
        border: '1px solid var(--border)', 
        borderRadius: 'var(--radius-sm)', 
        padding: '1.5rem',
        marginBottom: '2rem' 
      }}>
        <p style={{ color: 'var(--fg)', fontSize: '1rem', marginBottom: '1rem', lineHeight: 1.75 }}>
          {personal.bio}
        </p>
        <p style={{ color: 'var(--muted-light)', fontSize: '0.925rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
          I specialize in building fault-tolerant backend infrastructure, low-latency microservices, and distributed data systems. I believe in writing readable, maintainable code backed by rigorous telemetry and empirical benchmarks.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          My development philosophy draws heavily on principles of modularity, deterministic execution, and continuous optimization.
        </p>
      </div>

      {/* Technical Stack */}
      {technicalStack && (
        <>
          <div className="section-header">
            <div className="section-title">
              <span className="prefix">//</span>
              <span>Technical Craft</span>
            </div>
            <div className="section-divider"></div>
          </div>

          <div className="stack-grid" style={{ marginBottom: '2rem' }}>
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

      {/* Open Source Contributions */}
      {openSource && openSource.length > 0 && (
        <>
          <div className="section-header">
            <div className="section-title">
              <span className="prefix">//</span>
              <span>Open Source Contributions</span>
            </div>
            <div className="section-divider"></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {openSource.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'var(--surface)', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '1.15rem' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '0.95rem' }}>{item.org}</span>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.role}</span>
                </div>
                <p style={{ color: 'var(--muted-light)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* GitHub Calendar */}
      <div className="section-header">
        <div className="section-title">
          <span className="prefix">//</span>
          <span>Contribution Activity</span>
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
