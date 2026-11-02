import data from '../data/teams.json'

const logos = import.meta.glob('../assets/images/teams/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const getTeamLogo = (title) => {
  const team = data.teams.find((t) => t.title === title)
  if (!team) return null
  const file = team.cover.split('/').pop().replace(/\.\w+$/, '')
  return logos[`../assets/images/teams/${file}.svg`]
}