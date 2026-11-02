import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPlayersByPosition } from '../../api/players'
import { getPosition } from '../../utils/position'
import PlayerTable from '../PlayerTable/PlayerTable'
import '../TeamData/teamData.css'

export default function PositionData() {
  const { position } = useParams()
  const info = getPosition(position)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getPlayersByPosition(position)
      .then(setPlayers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [position])

  if (error) return <p className="td-state">Error: {error}</p>
  if (loading) return <p className="td-state">Loading…</p>

  return (
    <section className="td">
      <Link to="/positions" className="td-back">
        <ArrowLeft size={18} /> All positions
      </Link>
      <div className="td-title">
        <h1>{info?.title ?? position}</h1>
      </div>
      <PlayerTable players={players} hideFilter/>
    </section>
  )
}