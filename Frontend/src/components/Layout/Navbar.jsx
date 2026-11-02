import { NavLink } from 'react-router-dom'
import { Home, Shirt, Flag, Users, Search } from 'lucide-react'
import './navbar.css'

import logo from '../../assets/images/PL.webp'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/teams', label: 'Teams', icon: Shirt },
  { to: '/nations', label: 'Nations', icon: Flag },
  { to: '/positions', label: 'Positions', icon: Users },
  { to: '/search', label: 'Search', icon: Search },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <img src={logo} alt="PremierZone logo" />
        Premier<span>Zone</span>
      </NavLink>
      <nav>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}