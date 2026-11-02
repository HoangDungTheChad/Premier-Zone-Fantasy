import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Teams from './components/Teams/Teams'
import TeamData from './components/TeamData/TeamData'
import Nations from './components/Nations/Nations'
import NationData from './components/NationData/NationData'
import Positions from './components/Positions/Positions'
import PositionData from './components/PositionData/PositionData'
import Search from './components/Search/Search'
import PlayerDetail from './components/PlayerDetail/PlayerDetail'

const Soon = ({ name }) => <h2 style={{ padding: '2rem' }}>{name} coming soon</h2>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:team" element={<TeamData />} />
        <Route path="/nations" element={<Nations />} />
        <Route path="/nations/:nation" element={<NationData />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/positions/:position" element={<PositionData />} />
        <Route path="/search" element={<Search />} />
        <Route path="/player/:name" element={<PlayerDetail />} />
      </Route>
    </Routes>
  )
}