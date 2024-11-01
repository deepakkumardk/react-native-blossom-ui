import {ReactNode} from 'react'

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
  | '1000'
  | '1100'

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
  options?: object
} & Children
