import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
  return (
    <section className="hero">
      <h1>Welcome to<br /><span>PremierZone</span> Fantasy</h1>
      <p>Your home for everything Premier League: players, teams, nations and stats.</p>
      <Link to="/teams" className="cta">Get started</Link>
    </section>
  )
}