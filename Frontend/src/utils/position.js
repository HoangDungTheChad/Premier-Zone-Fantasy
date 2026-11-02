import data from '../data/positions.json'

const images = import.meta.glob('../assets/images/positions/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const getPosition = (search) => data.positions.find((p) => p.search === search)

export const getPositionImage = (cover) => {
  const file = cover.split('/').pop().replace(/\.\w+$/, '')
  return images[`../assets/images/positions/${file}.png`]
}