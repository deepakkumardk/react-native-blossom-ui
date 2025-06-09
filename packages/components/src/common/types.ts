import {ReactNode} from 'react'
import {TextStyle} from 'react-native'

export type BlossomStatus =
  | 'primary'
  | 'accent'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'

export type BlossomTransparentStatus =
  | `${BlossomStatus}Transparent`
  | `backgroundTransparent`

export type BlossomSize = 'small' | 'medium' | 'large'

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

export type TransparentColorVariants = '100' | '200' | '300' | '400' | '500'

export type ThemeColorNames = SemanticColorNames | SurfaceColorNames

export type SemanticColorNames =
  | 'primary'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'

export type SurfaceColorNames = 'background' | 'text' | 'bgLight' | 'bgDark'

export type BlossomThemeColors = {
  [K in `${ThemeColorNames}${ColorVariants}`]: BlossomColor
} & {
  [K in `${BlossomTransparentStatus}${TransparentColorVariants}`]: BlossomColor
}

export interface BlossomContext {
  colors: BlossomThemeColors
  isDark?: boolean
  options?: BlossomUIOptions
}

export type Children = {
  /**
   * Children
   */
  children?: ReactNode
}

export type BlossomThemeProviderProps = {
  /**
   * App theme colors json for light and dark mode
   */
  theme?: BlossomThemeColors
  /**
   * Whether the app is in dark mode or not
   */
  isDark?: boolean
  /**
   * Extra options to control the other aspects of the library
   */
  options?: BlossomUIOptions
} & Children

export type TypographyValues = {
  [K in `${TypographyOptions}`]?:
    | Pick<TextStyle, 'fontSize' | 'fontWeight'>
    | object
}

export type BlossomUIOptions = {
  /**
   * Control the border radius for all components like input, button etc.
   */
  borderRadius?: number
  /**
   * Modify the font size/weight values using this
   * h1-h6 are used for headings
   * s1-s3 are used for subheadings
   * b1-b3 are used for body text
   * l1-l3 are used for labels
   * c1-c3 are used for captions
   * @default b2
   */
  typography?: TypographyValues
}

/**
 * -----Typography Options-----
 * These are the typography options that can be used in the Text component
 * The values are used to define the font size and font weight.
 */
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
  | 's3'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'l1'
  | 'l2'
  | 'l3'
  | 'c1'
  | 'c2'
  | 'c3'

/**
 * -----Base for almost all components-----
 */
export interface BaseUIProps {
  /**
   * @default primary
   */
  status?: BlossomStatus
  /**
   * @default medium
   */
  size?: BlossomSize
}

export type OmitSizeProps = Omit<BaseUIProps, 'size'>

/**
 * Start of ComponentManager Props
 */

// export type ThemeValues = Pick<BlossomContext, 'colors' | 'isDark'>
export type ThemeValues = {
  colors: BlossomThemeColors
  isDark?: boolean
  // options?: BlossomUIOptions
}

export type ComponentPropsObjectMap<T> = {
  [K in keyof T]?: (props: T[K], theme: ThemeValues) => Partial<T[K]>
}

/**
 * End of ComponentManager Props
 */
