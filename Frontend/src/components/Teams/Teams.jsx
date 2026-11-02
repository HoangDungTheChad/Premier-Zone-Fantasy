import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../data/teams.json'
import './teams.css'

const logos = import.meta.glob('../../assets/images/teams/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const label = (title) => title.replace(/-/g, ' ')

// "/teams/AstonVilla.png" -> "AstonVilla" -> the bundled AstonVilla.svg
const getLogo = (cover) => {
  const file = cover.split('/').pop().replace(/\.\w+$/, '')
  return logos[`../../assets/images/teams/${file}.svg`]
}

export default function Teams() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const teams = data.teams.filter((t) =>
    label(t.title).toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="teams">
      <h1>Teams</h1>
      <input
        className="teams-search"
        placeholder="Search for teams"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="teams-grid">
        {teams.map((t) => (
          <div className="team-card" key={t.title}>
            <img src={getLogo(t.cover)} alt={label(t.title)} />
            <div className="team-overlay">
              <h3>{label(t.title)}</h3>
              <button onClick={() => navigate(`/teams/${t.title}`)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}