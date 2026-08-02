import React from 'react'
import { ExternalLinkIcon } from '../components/Icons'

export default function Blog({ data }) {
  const { writings } = data

  return (
    <main className="container" style={{ paddingBottom: '0', minHeight: '60vh', paddingTop: '2rem' }}>
      <h1 style={{ fontSize: '2.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--fg-heading)' }}>
        Blog
      </h1>
      <p style={{ fontSize: '1rem', color: 'var(--muted)', marginBottom: '2.25rem', fontStyle: 'italic' }}>
        Thoughts on backend engineering, system architecture, and deep tech.
      </p>

      {writings && writings.length > 0 ? (
        <div className="writings-list">
          {writings.map((w, i) => (
            <a 
              key={i} 
              href={w.link} 
              target="_blank" 
              rel="noreferrer" 
              className="writing-row"
              style={{ padding: '1.1rem 1.35rem' }}
            >
              <div>
                <div className="writing-title">{w.title}</div>
                <div className="writing-meta">Published on {w.platform} • {w.date}</div>
              </div>
              <div style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>
                <ExternalLinkIcon />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', fontStyle: 'italic' }}>
          No posts yet. Check back soon!
        </p>
      )}
    </main>
  )
}
