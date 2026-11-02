import { api } from './client'

export const getPlayersByTeam = (team) => {
  const config = {
    params: {team}  
  };  

  return api.get('api/v1/player', config)
    .then((res) => res.data)
}

export const getPlayersByNation = (nation) =>
  api.get('/api/v1/player', { params: { nation } }).then((res) => res.data)

export const getPlayersByPosition = (position) =>
  api.get('/api/v1/player', { params: { position } }).then((res) => res.data)

export const getPlayersByName = (name) =>
  api.get('/api/v1/player', { params: { name } }).then((res) => res.data)

// export const getPlayer = (name) =>
//   api.get(`/api/v1/player/${encodeURIComponent(name)}`).then((res) => res.data)

export const getPlayer = (name) =>
  api.get(`/api/v1/player/${encodeURIComponent(name)}`).then((res) => res.data)