import data from '../data/nations.json'

const flags = import.meta.glob('../assets/images/nations/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const getNation = (search) => data.nations.find((n) => n.search === search)
export const getNationFlag = (code) => flags[`../assets/images/nations/${code}.svg`]