import React from 'react'
import { ExternalLinkIcon } from '../components/Icons'

export default function Blog({ data }) {
  const { writings } = data

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginTop: 0 }}>
        <div className="section-title">
          <span className="prefix">//</span>
          <span>Technical Writings & Notes</span>
        </div>
        <div className="section-divider"></div>
      </div>

      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Technical investigations, post-mortems, and architectural notes from building backend systems.
      </p>

      <div className="writings-list">
        {writings && writings.map((article, idx) => (
          <a 
            key={idx} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="writing-row"
          >
            <div>
              <div className="writing-title">{article.title}</div>
              <div className="writing-meta">{article.platform} • {article.date}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)' }}>
              <ExternalLinkIcon />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
