import {ReactNode} from 'react'
import {TextStyle} from 'react-native'

export type BlossomColor = string

export type ColorVariants =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
// | '1000'
// | '1100'

export type ColorNames =
  | 'primary'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'background'
  | 'text'
  | 'bgLight'
  | 'bgDark'

export type BlossomThemeColors = {
  [K in `${ColorNames}${ColorVariants}`]: BlossomColor
}

export interface BlossomContext {
  colors: BlossomThemeColors
  isDark?: boolean
  options?: BlossomUIOptions
}

export type Children = {
  children?: ReactNode
}

export type WithChildren<T> = {
  children?: ReactNode
} & T

export type BlossomThemeProviderProps = {
  theme: BlossomThemeColors
  isDark?: boolean
  options?: BlossomUIOptions
} & Children

export type TypographyValues = {
  [K in `${TypographyOptions}`]?:
    | Pick<TextStyle, 'fontSize' | 'fontWeight'>
    | object
}

export type BlossomUIOptions = {
  borderRadius?: number
  typography?: TypographyValues
}

export type TypographyOptions =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  // Other options
  | 's1'
  | 's2'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'l1'
  | 'l2'
  | 'c1'
  | 'c2'
