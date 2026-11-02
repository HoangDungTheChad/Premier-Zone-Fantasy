import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../data/nations.json'
import { getNationFlag } from '../../utils/nationFlag'
import '../Teams/teams.css'
import './nations.css'

export default function Nations() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const nations = data.nations.filter((n) =>
    n.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="teams">
      <h1>Nations</h1>
      <input
        className="teams-search"
        placeholder="Search for countries"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="teams-grid">
        {nations.map((n) => (
          <div className="team-card flag" key={n.code}>
            <img src={getNationFlag(n.code)} alt={n.name} />
            <div className="team-overlay">
              <h3>{n.name}</h3>
              <button onClick={() => navigate(`/nations/${n.search}`)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}