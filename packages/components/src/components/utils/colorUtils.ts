import chroma from 'chroma-js'

export const getAlphaColor = (inputColor?: string, alpha = 0.5) => {
  if (!inputColor) return ''
  return chroma(inputColor).alpha(alpha).hex()
}

export const getDarkenColor = (inputColor?: string, darken = 0.5) => {
  if (!inputColor) return ''
  return chroma(inputColor).darken(darken).hex()
}
