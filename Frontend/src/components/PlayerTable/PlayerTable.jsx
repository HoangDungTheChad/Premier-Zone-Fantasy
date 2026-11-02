import { useMemo, useState } from 'react'
import '../TeamData/teamData.css'
import { Link } from 'react-router-dom'

const PAGE_SIZE = 10

const int = (v) => (v == null ? '-' : Math.round(v))
const dec = (v) => (v == null ? '-' : Number(v).toFixed(1))

const COLUMNS = [
  { key: 'name', label: 'Player' },
  { key: 'team', label: 'Team', format: (v) => v?.replace(/-/g, ' ') },
  { key: 'nation', label: 'Nation' },
  { key: 'pos', label: 'Pos' },
  { key: 'age', label: 'Age' },
  { key: 'mp', label: 'Matches', format: int },
  { key: 'starts', label: 'Starts', format: int },
  { key: 'min', label: 'Minutes', format: int },
  { key: 'gls', label: 'Goals', format: int },
  { key: 'ast', label: 'Assists', format: int },
  { key: 'pk', label: 'Pens Scored', format: int },
  { key: 'crdy', label: 'Yellows', format: int },
  { key: 'crdr', label: 'Reds', format: int },
  { key: 'xg', label: 'xG', format: dec },
  { key: 'xag', label: 'xAG', format: dec },
]

const splitPos = (value) => String(value ?? '').split(',').map((s) => s.trim()).filter(Boolean)

export default function PlayerTable({ players, hide = [], hideFilter = false }) {
  const [position, setPosition] = useState('ALL')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const columns = COLUMNS.filter((c) => !hide.includes(c.key))

  const positions = useMemo(
    () => [...new Set(players.flatMap((p) => splitPos(p.pos)))].sort(),
    [players]
  )

  const filtered =
    position === 'ALL' ? players : players.filter((p) => splitPos(p.pos).includes(position))

  const changePosition = (value) => {
    setPosition(value)
    setVisible(PAGE_SIZE)
  }

  return (
    <>
      <div className="td-toolbar">
        <p className="td-count">{filtered.length} players</p>
        {!hideFilter && (
          <select value={position} onChange={(e) => changePosition(e.target.value)}>
            <option value="ALL">All positions</option>
            {positions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        )}
      </div>

      <div className="td-table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, visible).map((p) => (
              <tr key={p.name}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.key === 'name' ? (
                      <Link className="pt-name" to={`/player/${encodeURIComponent(p.name)}`}>{p.name}</Link>
                    ) : c.format ? c.format(p[c.key]) : p[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible < filtered.length && (
        <button className="td-more" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
          Show more ({filtered.length - visible} left)
        </button>
      )}
    </>
  )
}