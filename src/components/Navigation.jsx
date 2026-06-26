import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 1.5rem' }}>
      <header className="header">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          About
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Blog
        </NavLink>
      </header>
    </div>
  )
}
