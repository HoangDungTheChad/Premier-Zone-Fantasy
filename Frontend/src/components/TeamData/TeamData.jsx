import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPlayersByTeam } from '../../api/players'
import { getTeamLogo } from '../../utils/teamLogo'
import PlayerTable from '../PlayerTable/PlayerTable'
import './teamData.css'

export default function TeamData() {
  const { team } = useParams()
  const logo = getTeamLogo(team)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getPlayersByTeam(team)
      .then(setPlayers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [team])

  if (error) return <p className="td-state">Error: {error}</p>
  if (loading) return <p className="td-state">Loading…</p>

  return (
    <section className="td">
      <Link to="/teams" className="td-back">
        <ArrowLeft size={18} /> All teams
      </Link>
      <div className="td-title">
        {logo && <img src={logo} alt="" width={64} height={64} />}
        <h1>{team.replace(/-/g, ' ')}</h1>
      </div>
      <PlayerTable players={players} hide={['team']} />
    </section>
  )
}