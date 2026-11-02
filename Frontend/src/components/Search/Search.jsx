import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { getPlayersByName } from '../../api/players'
import { getTeamLogo } from '../../utils/teamLogo'
import './search.css'

const MAX_RESULTS = 50

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [input, setInput] = useState(q)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!q) {
      setPlayers([])
      return
    }
    setLoading(true)
    setError(null)
    getPlayersByName(q)
      .then(setPlayers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [q])

  const submit = (e) => {
    e.preventDefault()
    const term = input.trim()
    if (term) setParams({ q: term })
  }

  return (
    <section className="search">
      <h1>Search</h1>

      <form className="search-bar" onSubmit={submit}>
        <SearchIcon size={20} />
        <input
          placeholder="Search for players"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit">Go</button>
      </form>

      {!q && <p className="search-hint">Type a player's name, e.g. "sal".</p>}
      {loading && <p className="search-hint">Searching…</p>}
      {error && <p className="search-hint">Error: {error}</p>}
      {q && !loading && !error && players.length === 0 && (
        <p className="search-hint">No players found for “{q}”.</p>
      )}

      {players.length > 0 && !loading && (
        <>
          <p className="search-hint">
            {players.length} result{players.length > 1 ? 's' : ''}
            {players.length > MAX_RESULTS && ` (showing first ${MAX_RESULTS})`}
          </p>
          <ul className="search-results">
            {players.slice(0, MAX_RESULTS).map((p) => {
              const logo = getTeamLogo(p.team)
              return (
                <li key={p.name}>
                  <Link to={`/player/${encodeURIComponent(p.name)}`}>
                    {logo ? <img src={logo} alt="" /> : <span className="logo-gap" />}
                    <span className="r-name">{p.name}</span>
                    <span className="r-meta">{p.team?.replace(/-/g, ' ')}</span>
                    <span className="r-pos">{p.pos}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}