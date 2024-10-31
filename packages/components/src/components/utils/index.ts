import {ColorValue, StyleProp, TextStyle, ViewStyle} from 'react-native'

import chroma from 'chroma-js'

import {BlossomThemeColors, ColorVariants} from '../../context'
import {BlossomStatus} from '../types'

export const getStatusColorName = (
  status?: BlossomStatus,
  isDark?: boolean,
  colorVariant: ColorVariants = '600',
) => {
  if (!status) return 'background1100'
  // TODO if shades count changes change it
  const color = `${status}${colorVariant}` as keyof BlossomThemeColors

  return color
}

export const getBorderColorName = (
  status?: BlossomStatus,
  isDark?: boolean,
  colorVariant: ColorVariants = '600',
) => {
  if (!status) return 'background900'
  // TODO if shades count changes change it
  const color = `${status}${colorVariant}` as keyof BlossomThemeColors

  return color
}

/**
 * @returns text color based on the given color luminance value
 */
export const getTextColorName = (
  color?: string | ColorValue,
  isDark?: boolean,
) => {
  if (!color) return 'background1100'

  const lum = chroma(color as string).luminance()
  if (isDark) {
    return lum < 0.4 ? 'background1100' : 'background100'
  }
  return lum < 0.4 ? 'background100' : 'background1100'
}

export const getFlatStyle = (
  style?: StyleProp<ViewStyle | TextStyle>,
): ViewStyle | TextStyle => {
  let obj: ViewStyle | TextStyle = {}
  if (!style) {
    return obj
  }
  if (Array.isArray(style)) {
    obj = style
      .flat()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .reduce((acc: object, value: object) => ({...acc, ...value}), {}) as
      | ViewStyle
      | TextStyle
    return obj
  }

  return style as ViewStyle | TextStyle
}

export const getPressedColor = (color?: string | ColorValue) => {
  if (!color) return undefined

  return chroma(color as string)
    .alpha(0.8)
    .hex()
}

export const isColor = (color?: unknown) => {
  return chroma.valid(color)
}
