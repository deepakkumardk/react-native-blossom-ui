import chroma from 'chroma-js'

const SHADES_COUNT = 12
const size = Math.floor(SHADES_COUNT / 2)

export const generateColorShades = (inputColor: string) => {
  const firstColor = chroma(inputColor)
    // @ts-ignore
    .tint(6 * 0.12)
    .hex()

  const lastColor = chroma(inputColor)
    // @ts-ignore
    .shade(7 * 0.12)
    .hex()

  const lowerShades = chroma
    .bezier([firstColor, inputColor])
    .scale()
    .mode('hcl')
    .colors(6)

  const higherShades = chroma
    .scale([inputColor, lastColor])
    .mode('hcl')
    .colors(size)

  return [...lowerShades.slice(0, -1), ...higherShades]
}

export function textColorShade(inputColor = 'gray') {
  const firstColor = 'white'
  const lastColor = 'black'

  const lightShades = chroma
    .bezier([firstColor, inputColor])
    .scale()
    .mode('lab')
    .colors(size)

  const darkShades = chroma
    .scale([inputColor, lastColor])
    .mode('lab')
    .colors(size)

  return [...lightShades.slice(0, -1), ...darkShades]
}

export const getTextColor = (color?: string) => {
  if (!color) return 'black'
  const lum = chroma(color).luminance()
  return lum < 0.4 ? 'white' : 'black'
}

export function colorShadesWithName(color?: string, name?: string) {
  let obj = {}
  if (!color) return obj
  const shadeColors = generateColorShades(color)
    // .reverse()
    .map((value, i) => ({
      [`${name}${(i + 1) * 100}`]: value,
    }))
  shadeColors.forEach((item) => {
    obj = {
      ...obj,
      ...item,
    }
  })

  return obj
}

export function colorShadesFromArray(array: string[], name: string) {
  let obj = {}
  const shadeColors = array.map((value, i) => ({
    [`${name}${(i + 1) * 100}`]: value,
  }))
  shadeColors.forEach((item) => {
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
    .colors(SHADES_COUNT - 1)

  return shades
}
