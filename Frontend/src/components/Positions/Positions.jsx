import { useNavigate } from 'react-router-dom'
import data from '../../data/positions.json'
import { getPositionImage } from '../../utils/position'
import '../Teams/teams.css'
import './positions.css'

export default function Positions() {
  const navigate = useNavigate()

  return (
    <section className="teams">
      <h1>Positions</h1>
      <div className="teams-grid pos-grid">
        {data.positions.map((p) => (
          <div className="team-card photo" key={p.search}>
            <img src={getPositionImage(p.cover)} alt={p.title} />
            <span className="pos-badge">{p.search}</span>
            <div className="team-overlay">
              <h3>{p.title}</h3>
              <button onClick={() => navigate(`/positions/${p.search}`)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}