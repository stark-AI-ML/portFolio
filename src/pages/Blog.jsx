import React, { useEffect, useRef } from 'react'
import { ExternalLinkIcon } from '../components/Icons'
import { initScrollObserver } from '../lib/animations'

export default function Blog({ data }) {
  const { writings } = data
  const mainRef = useRef(null)

  useEffect(() => {
    if (!mainRef.current) return
    const cleanup = initScrollObserver(mainRef.current)
    return cleanup
  }, [])

  return (
    <main ref={mainRef} className="container" style={{ paddingBottom: '3rem', paddingTop: '1.5rem', minHeight: '65vh' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Essays & Notes</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '2rem' }}>
          Thoughts on backend engineering, distributed systems, and deep tech.
        </p>
      </div>

      <div className="reveal-on-scroll">
        {writings && writings.length > 0 ? (
          <div className="writings-list">
            {writings.map((w, i) => (
              <a key={i} href={w.link} target="_blank" rel="noreferrer" className="writing-row">
                <div>
                  <h3 className="writing-title">{w.title}</h3>
                  <p className="writing-meta">Published on {w.platform} · {w.date}</p>
                </div>
                <div className="writing-arrow" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="mono" style={{ fontSize: '0.8rem' }}>Read</span>
                  <ExternalLinkIcon />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', fontStyle: 'italic' }}>
            No essays published yet. Check back soon!
          </p>
        )}
      </div>
    </main>
  )
}
