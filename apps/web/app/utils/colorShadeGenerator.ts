import chroma from 'chroma-js'

const SHADES_COUNT = 10
// const FILTER_INDEX = [0, 1, 3, 5, 7]
// 100 to 900
const FILTER_INDEX = [0, 2, 4, 7]
const BG_SHADES_COUNT = 9

// 100 to 700
// const SHADES_COUNT = 10
// const FILTER_INDEX = [1, 4, 7]
// const BG_SHADES_COUNT = 7

const SIZE = Math.floor(BG_SHADES_COUNT / 2)

const getTintColors = (inputColor: string) => {
  return Array(SHADES_COUNT)
    .fill(0)
    .map((_, i) =>
      chroma(inputColor)
        // @ts-ignore
        .tint((i + 1) / SHADES_COUNT)
        .hex(),
    )
}

const getShadeColors = (inputColor: string) => {
  return Array(SHADES_COUNT)
    .fill(0)
    .map((_, i) =>
      chroma(inputColor)
        // @ts-ignore
        .shade((i + 1) / SHADES_COUNT)
        .hex(),
    )
}

export const generateColorShades = (
  inputColor: string,
  filterIndex = FILTER_INDEX,
) => {
  const lowerShades = getTintColors(inputColor)
    .filter((_, i) => (filterIndex?.length ? filterIndex?.includes(i) : true))
    .reverse()

  if (filterIndex.length) {
    lowerShades[0] = chroma(inputColor).alpha(0.1).hex()
    lowerShades[1] = chroma(inputColor).alpha(0.25).hex()
  }

  const higherShades = getShadeColors(inputColor).filter((_, i) =>
    filterIndex?.length ? filterIndex?.includes(i) : true,
  )

  return [...lowerShades, inputColor.toLowerCase(), ...higherShades]
}

export const generateColorShadesBetween = (
  startColor: string,
  midColor: string,
  endColor: string,
) => {
  const lightShades = chroma
    .bezier([startColor, midColor])
    .scale()
    .mode('lab')
    .colors(SIZE)

  const darkShades = chroma.scale([midColor, endColor]).mode('lab').colors(SIZE)

  return [...lightShades.slice(0, -1), ...darkShades]
}

export function textColorShade(inputColor = 'gray') {
  return chroma
    .scale(['white', inputColor, 'black'])
    .mode('lab')
    .colors(BG_SHADES_COUNT)
}

export const getTextColor = (color?: string) => {
  if (!color) return 'black'
  const lum = chroma(color).luminance()
  return lum < 0.2 ? 'white' : 'black'
}

export function getColorShadesWithName(color?: string, name?: string) {
  let obj = {}
  if (!color) return obj

  return shadesArrayToObject(generateColorShades(color), name ?? '')
}

export function shadesArrayToObject(array: string[], name: string) {
  let obj = {}

  array
    .map((value, i) => ({
      [`${name}${(i + 1) * 100}`]: value,
    }))
    .forEach((item) => {
      obj = {
        ...obj,
        ...item,
      }
    })

  return obj
}

export function getBgColors(mode: 'light' | 'dark', surfaceColor?: string) {
  const firstColor = mode === 'light' ? surfaceColor || 'white' : 'gray'
  const lastColor = mode === 'light' ? 'gray' : surfaceColor || 'black'

  const shades = chroma
    .bezier([firstColor, lastColor])
    .scale()
    .mode('lab')
    .colors(BG_SHADES_COUNT)

  return shades
}
