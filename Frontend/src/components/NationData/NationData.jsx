import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPlayersByNation } from '../../api/players'
import { getNation, getNationFlag } from '../../utils/nationFlag'
import PlayerTable from '../PlayerTable/PlayerTable'
import '../TeamData/teamData.css'

export default function NationData() {
  const { nation } = useParams()
  const info = getNation(nation)
  const flag = info && getNationFlag(info.code)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getPlayersByNation(nation)
      .then(setPlayers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [nation])

  if (error) return <p className="td-state">Error: {error}</p>
  if (loading) return <p className="td-state">Loading…</p>

  return (
    <section className="td">
      <Link to="/nations" className="td-back">
        <ArrowLeft size={18} /> All nations
      </Link>
      <div className="td-title">
        {flag && <img className="flag" src={flag} alt="" />}
        <h1>{info?.name ?? nation}</h1>
      </div>
      <PlayerTable players={players} hide={['nation']} />
    </section>
  )
}