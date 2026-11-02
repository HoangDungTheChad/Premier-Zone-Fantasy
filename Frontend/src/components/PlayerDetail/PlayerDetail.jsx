import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPlayer } from '../../api/players'
import { getTeamLogo } from '../../utils/teamLogo'
import { getNation, getNationFlag } from '../../utils/nationFlag'
import './playerDetail.css'

const num = (v) => (v == null ? 0 : v)
const per90 = (v, min) => ((num(v) / min) * 90).toFixed(2)
// handles "ENG" and "eng ENG" style values
const nationCode = (raw) => String(raw ?? '').trim().split(/\s+/).pop()

function CompareBar({ label, actual, expected }) {
  const a = num(actual)
  const e = num(expected)
  const max = Math.max(a, e, 1)
  const diff = a - e
  return (
    <div className="pd-compare">
      <div className="pd-compare-head">
        <h3>{label}</h3>
        <span className={diff >= 0 ? 'up' : 'down'}>
          {diff >= 0 ? '+' : ''}{diff.toFixed(1)} vs expected
        </span>
      </div>
      <div className="pd-row">
        <em>Actual</em>
        <div className="pd-bar"><i className="actual" style={{ width: `${(a / max) * 100}%` }} /></div>
        <b>{Math.round(a)}</b>
      </div>
      <div className="pd-row">
        <em>Expected</em>
        <div className="pd-bar"><i className="expected" style={{ width: `${(e / max) * 100}%` }} /></div>
        <b>{e.toFixed(1)}</b>
      </div>
    </div>
  )
}

export default function PlayerDetail() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [p, setP] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getPlayer(name)
      .then(setP)
      .catch((e) => setError(e.response?.status === 404 ? 'Player not found' : e.message))
      .finally(() => setLoading(false))
  }, [name])

  if (loading) return <p className="pd-state">Loading…</p>
  if (error) return <p className="pd-state">{error}</p>

  const logo = getTeamLogo(p.team)
  const code = nationCode(p.nation)
  const nation = getNation(code)
  const flag = nation && getNationFlag(nation.code)
  const min = num(p.min)

  const tiles = [
    ['Matches', num(p.mp)],
    ['Starts', num(p.starts)],
    ['Minutes', Math.round(min)],
    ['Goals', Math.round(num(p.gls))],
    ['Assists', Math.round(num(p.ast))],
  ]

  return (
    <section className="pd">
      <button className="pd-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <header className="pd-hero">
        {logo && <img className="pd-logo" src={logo} alt="" />}
        <div>
          <div className="pd-chips">
            <span className="pd-pos">{p.pos}</span>
            <span>Age {p.age}</span>
          </div>
          <h1>{p.name}</h1>
          <div className="pd-meta">
            <Link to={`/teams/${p.team}`}>{p.team?.replace(/-/g, ' ')}</Link>
            {nation ? (
              <Link to={`/nations/${nation.search}`} className="pd-nation">
                {flag && <img src={flag} alt="" />} {nation.name}
              </Link>
            ) : (
              <span>{p.nation}</span>
            )}
          </div>
        </div>
      </header>

      <div className="pd-tiles">
        {tiles.map(([label, value]) => (
          <div className="pd-tile" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="pd-grid">
        <div className="pd-card">
          <CompareBar label="Goals vs xG" actual={p.gls} expected={p.xg} />
          <CompareBar label="Assists vs xAG" actual={p.ast} expected={p.xag} />
        </div>

        <div className="pd-card">
          <h3>Per 90 minutes</h3>
          {min >= 90 ? (
            <div className="pd-per90">
              <div><strong>{per90(p.gls, min)}</strong><span>Goals</span></div>
              <div><strong>{per90(p.ast, min)}</strong><span>Assists</span></div>
              <div><strong>{per90(num(p.gls) + num(p.ast), min)}</strong><span>G + A</span></div>
            </div>
          ) : (
            <p className="pd-muted">Not enough minutes played for per-90 stats.</p>
          )}

          <h3 className="pd-gap">Discipline</h3>
          <div className="pd-cards">
            <span className="yellow">{Math.round(num(p.crdy))} yellow</span>
            <span className="red">{Math.round(num(p.crdr))} red</span>
          </div>
        </div>
      </div>
    </section>
  )
}