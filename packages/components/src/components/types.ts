import {ReactNode} from 'react'
import {
  TextProps as RNTextProps,
  ActivityIndicatorProps as RNActivityIndicatorProps,
  TextInputProps as RNTextInputProps,
  SwitchProps as RNSwitchProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  PressableProps,
  ViewProps,
  DimensionValue,
  ImageProps,
  ColorValue,
} from 'react-native'
import {TypographyOptions} from '../types'

export type BlossomStatus =
  | 'primary'
  | 'accent'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'

export type BlossomSize = 'small' | 'medium' | 'large'

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

type Children = {
  children?: ReactNode
}

export interface TextProps extends RNTextProps, OmitSizeProps {
  typography?: TypographyOptions
}

export interface SizedTextProps extends TextProps, BaseUIProps {
  mode?: 'label' | 'caption'
}

export type ButtonMode = 'filled' | 'outlined' | 'text'

export interface ButtonProps extends PressableProps, BaseUIProps {
  text?: string
  mode?: ButtonMode
  textStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
  disabled?: boolean
  left?: ReactNode
  right?: ReactNode
  /**
   * Loader style
   */
  loaderStyle?: ActivityIndicatorProps
}

export interface ActivityIndicatorProps
  extends Omit<RNActivityIndicatorProps, 'size'>,
    Omit<BaseUIProps, 'size'> {
  /**
   * @default true
   */
  visible?: boolean
  /**
   * @default medium
   */
  size?: BlossomSize | number
}

export type TextInputMode = 'flat' | 'outlined'

export interface TextInputProps
  extends Omit<RNTextInputProps, 'style'>,
    BaseUIProps {
  label?: string
  placeholder?: string
  caption?: string
  /**
   * @description TextInput will always render this and take the space to fix the flicker issue in show/hide error
   */
  error?: string
  labelStyle?: StyleProp<TextStyle>
  placeholderStyle?: StyleProp<TextStyle>
  captionStyle?: StyleProp<TextStyle>
  errorStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>

  disabled?: boolean
  left?: ReactNode
  right?: ReactNode
  /**
   * @default outlined
   */
  mode?: TextInputMode
}

export interface SearchInputProps extends TextInputProps {
  withClearIcon?: boolean
  onQueryChange?: (query: string) => void
  debounceDelay?: number
}

export interface SwitchProps extends RNSwitchProps, BaseUIProps {
  color?: string
  label?: string
  caption?: string
  error?: string
  position?: 'left' | 'right'

  containerStyle?: StyleProp<ViewStyle>

  labelStyle?: StyleProp<TextStyle>
  captionStyle?: StyleProp<TextStyle>
  errorStyle?: StyleProp<TextStyle>
}

export interface DividerProps extends ViewProps {
  /**
   * @default 100%
   */
  width?: DimensionValue
  /**
   * @default 0.6
   */
  height?: DimensionValue
  /**
   * @default background900
   */
  color?: string
}

export interface AvatarProps extends Partial<ImageProps>, OmitSizeProps {
  size?: number | BlossomSize
  mode?: 'circle' | 'round' | 'square'
  initials?: string
  initialStyle?: StyleProp<TextStyle>
  icon?: (size: number) => ReactNode
}

export interface IconProps extends TextProps, OmitSizeProps {
  /**
   * Size of the icon, can also be passed as fontSize in the style object.
   * @default 12
   */
  size?: number | undefined

  /**
   * Name of the icon to show
   */
  name: string

  /**
   * Color of the icon
   */
  color?: ColorValue | number
}
