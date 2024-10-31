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
} from 'react-native'

export type BlossomStatus =
  | 'primary'
  | 'accent'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'

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
  loaderStyle?: LoaderProps
}

export interface LoaderProps
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
