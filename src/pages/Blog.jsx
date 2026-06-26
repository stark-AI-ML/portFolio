import { ExternalLinkIcon } from '../components/Icons'

export default function Blog({ data }) {
  const { writings } = data

  return (
    <main className="container" style={{ paddingBottom: '0', minHeight: '60vh' }}>
      <div className="animate-in delay-1">
        <h1 className="text-2xl font-bold text-foreground" style={{ fontSize: '2rem', marginBottom: '0.5rem', marginTop: '1rem' }}>Blog</h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '2.5rem' }}>Thoughts on backend engineering, system architecture, and deep tech.</p>
      </div>

      <div className="animate-in delay-2">
        {writings && writings.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {writings.map((w, i) => (
              <a key={i} href={w.link} target="_blank" rel="noreferrer" className="project-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1.25rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f4f4f5' }}>{w.title}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '0.3rem' }}>Published on {w.platform} • {w.date}</p>
                </div>
                <div className="project-link" style={{ margin: 0 }}>
                  <ExternalLinkIcon />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)', fontSize: '14px', fontStyle: 'italic' }}>No posts yet. Check back soon!</p>
        )}
      </div>
    </main>
  )
}
