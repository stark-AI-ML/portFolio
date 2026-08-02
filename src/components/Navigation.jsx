import { NavLink, Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className="header-wrapper">
      <header className="header">
        <Link to="/" className="brand-mark" aria-label="Home">
          <span>rudresh</span>
          <span className="brand-dot">/</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            // home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            // about
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            // blog
          </NavLink>
        </nav>
      </header>
    </div>
  )
}
