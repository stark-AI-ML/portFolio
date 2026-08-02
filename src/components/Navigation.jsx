import { Link, NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className="header-wrapper">
      <header className="header">
        <Link to="/" className="nav-brand" aria-label="Rudresh Singh Home">
          rs<span className="brand-dot">.</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Blog
          </NavLink>
        </nav>
      </header>
    </div>
  )
}
