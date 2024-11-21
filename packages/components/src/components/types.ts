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
  ViewProps as RNViewProps,
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

export type BlossomTransparentStatus = `${BlossomStatus}Transparent`

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
  /**
   * @default label
   */
  mode?: 'label' | 'caption'
}

export interface ViewProps extends RNViewProps {
  row?: boolean
}

export type ButtonMode = 'filled' | 'tinted' | 'outlined' | 'plain'

export interface ButtonProps extends PressableProps, BaseUIProps {
  title?: string
  mode?: ButtonMode
  titleStyle?: StyleProp<TextStyle>
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

export type PressableState = Readonly<{
  pressed: boolean
  hovered?: boolean
  focused?: boolean
}>

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
  url?: string
  initials?: string
  initialStyle?: StyleProp<TextStyle>
  icon?: (size: number) => ReactNode
  onPress?: () => void
}

export type IconFamily =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'

export interface IconProps extends TextProps, OmitSizeProps {
  /**
   * Vector icons family
   * @default Ionicons
   */
  family?: IconFamily
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

/**
 * Start of Form Fields Components
 */

export interface BaseBooleanFieldProps extends BaseUIProps, Children {
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

export interface SwitchProps extends RNSwitchProps, BaseBooleanFieldProps {}

export interface CheckboxProps extends BaseBooleanFieldProps {
  value?: boolean
  intermediate?: boolean
  onValueChange?: ((value: boolean) => Promise<void> | void) | null
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

/**
 * End of Form Fields Components
 */
