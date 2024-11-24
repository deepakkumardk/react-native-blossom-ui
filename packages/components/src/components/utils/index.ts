import {ColorValue, StyleProp, TextStyle, ViewStyle} from 'react-native'

import chroma from 'chroma-js'

import {
  BlossomStatus,
  BlossomThemeColors,
  ColorVariants,
  TransparentColorVariants,
} from '../../common'
import {ButtonMode} from '../types'

export const getStatusColorName = (
  status?: BlossomStatus,
  isDark?: boolean,
  colorVariant: ColorVariants = '500',
) => {
  if (!status) return 'background900'
  // TODO if shades count changes change it
  const color = `${status}${colorVariant}` as keyof BlossomThemeColors

  return color
}

export const getTransparentStatusColorName = (
  status?: BlossomStatus,
  colorVariant: TransparentColorVariants = '500',
) => {
  if (!status) return 'background900'
  // TODO if shades count changes change it
  const color =
    `${status}Transparent${colorVariant}` as keyof BlossomThemeColors

  return color
}

export const getBorderColorName = (
  status?: BlossomStatus,
  isDark?: boolean,
  colorVariant: ColorVariants = '500',
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
  isDisabled?: boolean,
  mode: ButtonMode = 'filled',
): keyof BlossomThemeColors => {
  if (!color) return 'text100'

  if (isDisabled) {
    const modeColorMap: Record<ButtonMode, keyof BlossomThemeColors> = {
      filled: 'text500',
      tinted: 'text500',
      outlined: 'text600',
      plain: 'text600',
    }
    return modeColorMap[mode]
  }

  const lum = chroma(color as string).luminance()
  if (isDark) {
    return lum < 0.4 ? 'text100' : 'text900'
  }
  return lum < 0.4 ? 'text900' : 'text100'
}

/**
 * @deprecated
 */
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

export const isColor = (color?: unknown) => {
  return chroma.valid(color)
}

export * from './colorUtils'
