import {LegacyRef, ReactNode} from 'react'
import {
  TextProps as RNTextProps,
  ActivityIndicatorProps as RNActivityIndicatorProps,
  TextInputProps as RNTextInputProps,
  SwitchProps as RNSwitchProps,
  ModalProps as RNModalProps,
  ViewProps as RNViewProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  PressableProps,
  DimensionValue,
  ImageProps,
  ColorValue,
  FlatListProps,
} from 'react-native'

import {
  BlossomSize,
  TypographyOptions,
  Children,
  OmitSizeProps,
  BaseUIProps,
} from '../common/types'

export interface TextProps extends RNTextProps, OmitSizeProps {
  /**
   * Typography option to control the size of the text
   * @default b2
   */
  typography?: TypographyOptions
}

export interface SizedTextProps extends TextProps, BaseUIProps {
  /**
   * Mode of the text label or caption
   * Caption will be used for both a caption or error text in form control inputs
   * @default label
   */
  mode?: 'label' | 'caption' | 'body'
}

export interface ViewProps extends RNViewProps {
  /**
   * Set true for horizontal(flexDirection) view
   */
  row?: boolean
}

export type ButtonMode = 'filled' | 'tinted' | 'outlined' | 'plain'

export interface ButtonProps extends PressableProps, BaseUIProps {
  /**
   * Change the appearance of the button using this
   * @default filled
   */
  mode?: ButtonMode

  /**
   * Button title text
   */
  title?: string
  /**
   * Title text style
   */
  titleStyle?: StyleProp<TextStyle>
  /**
   * Button style to add padding/margin etc.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Set it to true to show the activity indicator to the left
   */
  isLoading?: boolean
  /**
   * Set to true to disable the button
   */
  disabled?: boolean
  /**
   * Render any icon/JSX on left of the title
   */
  left?: ReactNode
  /**
   * Render any icon/JSX on right of the title
   */
  right?: ReactNode
  /**
   * Loader props
   */
  loaderProps?: ActivityIndicatorProps
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
  /**
   * Label text below indicator
   */
  label?: string
  /**
   * Label text style
   */
  labelStyle?: StyleProp<TextStyle>

  /**
   * Container style wrapping both label and ActivityIndicator
   */
  containerStyle?: StyleProp<ViewStyle>
}

export type TextInputMode = 'flat' | 'outlined'

export interface TextInputProps
  extends Omit<RNTextInputProps, 'style'>,
    BaseUIProps {
  /**
   * Control the different modes of the text input
   * @default outlined
   */
  mode?: 'flat' | 'outlined'
  /**
   * Have a denser background in the text input
   */
  dense?: boolean

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
   * @description Error text in error status below caption text
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
   * Input text style equivalent to react-native style for TextInput
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

export interface IconProps extends RNTextProps, OmitSizeProps {
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
   * Set it to false to position them apart i.e. space-between
   * @default true
   */
  adjacent?: boolean
  /**
   * Set to true for disabled field
   */
  disabled?: boolean
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

export interface RadioProps extends RNSwitchProps, BaseBooleanFieldProps {}

export interface CheckboxProps extends BaseBooleanFieldProps {
  /**
   * Control the state of the checkbox with value
   */
  value?: boolean
  /**
   * Set to true for an intermediate state
   */
  indeterminate?: boolean
  /**
   * Callback for on value change
   */
  onValueChange?: ((value: boolean) => Promise<void> | void) | null
  /**
   * Style of the checkbox
   */
  style?: StyleProp<ViewStyle>
}

/**
 * End of Form Fields Components
 */

/**
 * Mapping of props to their component name
 */
export type ComponentPropsMap = {
  ActivityIndicator: ActivityIndicatorProps
  Text: TextProps
  Button: ButtonProps

  View: ViewProps
  Divider: DividerProps

  Icon: IconProps
  Avatar: AvatarProps

  TextInput: TextInputProps
  SearchInput: SearchInputProps

  Checkbox: CheckboxProps
  Switch: SwitchProps
  Radio: RadioProps

  Modal: ModalProps
  Popover: PopoverProps
  SelectItem: SelectItemProps<unknown>
  SelectInput: SelectProps<unknown>
}

export interface ModalProps extends RNModalProps {
  onBackdropPress?: () => void
  backdropStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
}

export interface ModalContentProps {
  title?: string
  description?: string
  children?: string
  actionButtons?: ButtonProps[]
}

export interface PopoverProps {
  /**
   * Set it true to show the popover
   */
  visible?: boolean
  /**
   * Popover JSX content to show
   */
  children?: ReactNode
  /**
   * callback on clicking the outside area or back button of the popover to close it
   */
  onBackdropPress?: () => void
  /**
   * Style of the popover shown
   */
  contentStyle?: StyleProp<ViewStyle>
  /**
   * Render the target JSX using this prop
   */
  Target?: ReactNode
  /**
   * Target ref object to control it without states
   * If Target is passed then that will be given priority
   */
  targetRef?: LegacyRef<unknown>
  /**
   * Set it true to have the same width as of the Target view
   */
  fitTargetWidth?: boolean
}

export interface PopoverRef {
  /**
   * Open the popover
   */
  open: () => void
  /**
   * Close the popover
   */
  close: () => void
}

/**
 * Start of Select Props
 */

export interface SelectItemT<T> {
  /**
   * Label to show in the select
   */
  label: string
  /**
   * Any value data for select
   */
  value: T

  /**
   * This will disable the item to be selected
   */
  disabled?: boolean
}

export interface SelectItemProps<T> extends BaseUIProps {
  /**
   * Select Item object
   */
  item: SelectItemT<T>
  /**
   * Current index of the item
   */
  index: number
  /**
   * Currently selected index in the list
   */
  selectedIndex?: number
  /**
   * Item view style
   */
  style?: StyleProp<ViewStyle>
  /**
   * Item on press callback
   */
  onPress?: () => void

  /**
   * Set it to true to show tick icon on the selected row
   * @default true
   */
  withTickIcon?: boolean
}

export type RNFlatListProps<ItemT> = Partial<
  Omit<FlatListProps<SelectItemT<ItemT>>, 'data'>
>

export interface SelectProps<ItemT>
  extends BaseUIProps,
    Pick<TextInputProps, 'placeholder' | 'defaultValue' | 'disabled'>,
    RNFlatListProps<ItemT> {
  /**
   * List of options
   */
  options?: SelectItemT<ItemT>[]
  /**
   * Selected value from the data object
   * i.e. pass the `item.value` object that you get from `onValueChange`
   */
  value?: ItemT

  /**
   * Callback on every value change
   * @param selectedItem Clicked item value
   */
  onValueChange?: (selectedItem?: SelectItemT<ItemT>) => void

  /**
   * Set it true to open keyboard and show search results
   * TODO: add support for this
   */
  searchable?: boolean
  /**
   * Show the close icon at right to clear the selection
   */
  clearable?: boolean
  /**
   * Height of the popover shown for selecting the item
   */
  pickerHeight?: number
}

/**
 * End of Select Props
 */
