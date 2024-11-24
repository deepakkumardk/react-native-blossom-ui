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

import {
  BlossomSize,
  TypographyOptions,
  Children,
  OmitSizeProps,
  BaseUIProps,
} from '../common'

export interface TextProps extends RNTextProps, OmitSizeProps {
  /**
   * Typography option to control the size of the text
   */
  typography?: TypographyOptions
}

export interface SizedTextProps extends TextProps, BaseUIProps {
  /**
   * Mode of the text label or caption
   * Caption will be used for both a caption or error text in form control inputs
   * @default label
   */
  mode?: 'label' | 'caption'
}

export interface ViewProps extends RNViewProps {
  /**
   * Set true for horizontal(flexDirection) view
   */
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
   * Set to false to hide it
   * @default true
   */
  visible?: boolean
  /**
   * Control the size using pre-defined options
   * @default medium
   */
  size?: BlossomSize | number
}

export type TextInputMode = 'flat' | 'outlined'

export interface TextInputProps
  extends Omit<RNTextInputProps, 'style'>,
    BaseUIProps {
  /**
   * Label text above the input
   */
  label?: string
  /**
   * Placeholder for the text input
   */
  placeholder?: string
  /**
   * Caption text below the text input
   */
  caption?: string
  /**
   * TODO: TextInput will always render this and take the space to fix the flicker issue in show/hide error
   * Error text in error status below caption text
   */
  error?: string
  /**
   * Label text style
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Placeholder text style
   */
  placeholderStyle?: StyleProp<TextStyle>
  /**
   * Caption text style
   */
  captionStyle?: StyleProp<TextStyle>
  /**
   * Error text style
   */
  errorStyle?: StyleProp<TextStyle>
  /**
   * Container view style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Input box style
   */
  inputStyle?: StyleProp<ViewStyle>
  /**
   * Input text style
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Set to true to disable the button
   */
  disabled?: boolean
  /**
   * Render Icon/JSX on the left of the button
   */
  left?: ReactNode
  /**
   * Render Icon/JSX on the right of the button
   */
  right?: ReactNode
  /**
   * Control the different modes of the text input
   * @default outlined
   */
  mode?: 'flat' | 'outlined'
}

export interface SearchInputProps extends TextInputProps {
  withClearIcon?: boolean
  onQueryChange?: (query: string) => void
  debounceDelay?: number
}

export interface DividerProps extends ViewProps {
  /**
   * Control Width of the divider
   * @default 100%
   */
  width?: DimensionValue
  /**
   * Control height of the divider
   * @default 0.6
   */
  height?: DimensionValue
  /**
   * Color of the divider
   * @default background900
   */
  color?: string
}

export interface AvatarProps extends Partial<ImageProps>, OmitSizeProps {
  /**
   * Size of the Avatar
   * It can be either number or string ('small' | 'medium' | 'large')
   */
  size?: number | BlossomSize
  /**
   * Control the shape of the Avatar
   */
  mode?: 'circle' | 'round' | 'square'
  /**
   * Shorthand for the Source.uri of the image props
   * Here You can directly pass the url of the image
   * If not provided, it will fallback to showing initials or an icon.
   */
  url?: string
  /**
   * Show initials inside the Avatar
   * If not provided, it will fallback to showing an icon.
   */
  initials?: string
  /**
   * Initials Text style to control the font size etc.
   */
  initialStyle?: StyleProp<TextStyle>
  /**
   * Set a custom icon for Avatar
   * @param size Size of the Avatar rendered based on the size prop passed to it
   * You can use it to set the custom icon size
   */
  icon?: (size: number) => ReactNode
  /**
   * On press callback
   */
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
   * Vector icons family from vector-icons set
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
   * Set custom icon color
   */
  color?: ColorValue | number
}

/**
 * Start of Form Fields Components
 */

export interface BaseBooleanFieldProps extends BaseUIProps, Children {
  /**
   * Control the position of the field
   * @default right
   */
  position?: 'left' | 'right'
  /**
   * Set custom color
   */
  color?: string

  /**
   * Label text above the input
   */
  label?: string
  /**
   * Caption text below the text input
   */
  caption?: string
  /**
   * Error text in error `status` below caption text
   */
  error?: string

  /**
   * Container view style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Label text style
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Caption text style
   */
  captionStyle?: StyleProp<TextStyle>
  /**
   * Error text style
   */
  errorStyle?: StyleProp<TextStyle>
}

export interface SwitchProps extends RNSwitchProps, BaseBooleanFieldProps {}

export interface CheckboxProps extends BaseBooleanFieldProps {
  /**
   * Control the state of the checkbox with value
   */
  value?: boolean
  /**
   * Set to true for an intermediate state
   */
  intermediate?: boolean
  /**
   * Callback for on value change
   */
  onValueChange?: ((value: boolean) => Promise<void> | void) | null
  /**
   * Set to true for disabled field
   */
  disabled?: boolean
  /**
   * Style of the checkbox
   */
  style?: StyleProp<ViewStyle>
}

/**
 * End of Form Fields Components
 */
