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

export interface LinkProps extends TextProps {
  /**
   * Set the left side of the text
   */
  leftText?: string | ReactNode
  /**
   * Set the left side of the text
   */
  rightText?: string | ReactNode
  /**
   * Set the link label to show
   */
  title?: string
  /**
   * Set the href url for link
   */
  href?: string
  /**
   * Callback for when the given link can't be opened
   */
  onLinkOpenError?: (error: unknown) => void
}

export interface ViewProps extends RNViewProps {
  /**
   * Set true for horizontal(flexDirection) view
   */
  row?: boolean
}

export interface SpacerProps extends RNViewProps {
  /**
   * Width of the spacer
   */
  width?: number
  /**
   * Height of the spacer
   */
  height?: number
}

export interface AccordionProps {
  /**
   * Set it to true to open the accordion
   */
  isCollapsed?: boolean
  /**
   * Title of the accordion
   */
  title?: string | ReactNode
  /**
   * Title of the accordion
   */
  subtitle?: string | ReactNode
  /**
   * Title of the accordion
   */
  description?: string
  /**
   * Render custom view inside the accordion instead of the description only
   */
  children?: ReactNode
  /**
   * Render any icon/JSX on left of the title
   */
  left?: ReactNode
  /**
   * Render any icon/JSX on right of the title
   */
  right?: ReactNode
  /**
   * Container style for the accordion
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * On press callback on the title section
   */
  onPress?: () => void
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
   * button style for disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>
  /**
   * button text style for disabled state
   */
  disabledTitleStyle?: StyleProp<TextStyle>
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

export interface BaseButtonProps extends ButtonProps {
  /**
   * Set it to true to make it unselectable
   */
  viewOnly?: boolean
  /**
   * Callback on text color change
   * @param textColor color of the text based on status
   */
  onTextColorChange?: (textColor: string) => void
  /**
   * Callback on background color change
   * @param backgroundColor background color of the view based on status
   */
  onBackgroundColorChange?: (backgroundColor: string) => void
}

export type PressableState = Readonly<{
  pressed: boolean
  hovered?: boolean
  focused?: boolean
}>

export interface FABProps extends ButtonProps {
  /**
   * Set the icon of the FAB
   */
  icon?: ReactNode
  /**
   * Horizontal offset position for the fab
   * @default 48
   */
  offsetX?: number
  /**
   * Vertical offset position for the fab
   * @default 48
   */
  offsetY?: number
}

export interface ChipProps extends ButtonProps {
  /**
   * Use any custom icon for selected state
   */
  checkIcon?: ReactNode
  /**
   * Set it to true if selected
   */
  isSelected?: boolean
  /**
   * Show the select icon
   */
  withCheckIcon?: boolean
  /**
   * Show the close icon at right to clear the selection
   */
  clearable?: boolean
  /**
   * Set it to true to make it unselectable
   */
  viewOnly?: boolean
  /**
   * On clear callback
   */
  onClearPress?: () => void
  /**
   * Render it as a badge
   */
  asBadge?: boolean
}

export interface SegmentedButtonProps extends BaseUIProps {
  /**
   * List of props for control buttons
   */
  data?: ControlButtonProps[]
  /**
   * Mode of the button view
   */
  mode?: ButtonMode
  /**
   * Take the full width available
   */
  fullWidth?: boolean
  /**
   * Control the border radius of the edge buttons
   */
  borderRadius?: number
  /**
   * Show the vertical divider between the buttons
   */
  withVerticalDivider?: boolean
  /**
   * Set to true for multiple select
   */
  multiSelect?: boolean

  /**
   * active color when the button is selected
   */
  activeColor?: string
  /**
   * inactive color when the button is unselected
   */
  inactiveColor?: string

  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>
  /**
   * Disable the whole control
   */
  disabled?: boolean
  /**
   * OnPress callback with value
   */
  onPress?: (value: string, selectedIndex: number) => void
}

export interface ControlButtonProps extends ChipProps {
  /**
   * Label of the control button
   */
  label?: string
  /**
   * Value of the control button that will be passed to on Press & will fallback to label if not passed
   */
  value?: string
}

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
   * Render a custom Placeholder component for the text input
   */
  placeholderComponent?: ReactNode
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
   * Mock the disable behavior not the styling for popover contained inputs
   */
  shouldMockDisableState?: boolean
  /**
   * Render Icon/JSX on the left of the button
   */
  left?: ReactNode
  /**
   * Render Icon/JSX on the right of the button
   */
  right?: ReactNode
}

/**
 * Props for the AnimatedPlaceholder component.
 */
export interface AnimatedPlaceholderProps {
  /**
   * An array of placeholder strings to animate between.
   */
  placeholders: string[]
  /**
   * Duration in milliseconds each placeholder is displayed before transitioning.
   * @default 500
   */
  duration?: number
  /**
   * Custom styles for the container view of the placeholder.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Custom style for the placeholder text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Whether the placeholder is visible.
   * Set it to false to hide the placeholder.
   * @default true
   */
  visible?: boolean
}

/**
 * Props for the SearchInput component.
 */
export interface SearchInputProps extends TextInputProps {
  /**
   * Whether to show a clear (X) icon to reset the input at the right.
   * Set it to true to show the clear icon.
   * @default false
   */
  withClearIcon?: boolean
  /**
   * Callback when the search query changes.
   * @param query - The updated query string.
   */
  onQueryChange?: (query: string) => void
  /**
   * Delay in milliseconds to debounce the query change callback.
   * @default 300
   */
  debounceDelay?: number
  /**
   * Customize the animated placeholder behavior with a slide-up animation.
   */
  animatedPlaceholderProps?: AnimatedPlaceholderProps
}

export interface OtpInputProps extends Omit<TextInputProps, 'mode'> {
  /**
   * Set the otp input length
   * @default 4
   */
  maxLength?: number
  /**
   * Set the style for each box with isFocused prop
   */
  boxStyle?:
    | StyleProp<ViewStyle>
    | ((isFocused: boolean) => StyleProp<ViewStyle>)
  /**
   * different view based on the mode
   * @default box
   */
  mode?: 'box' | 'dash'
  /**
   * Set it to true to enable otp cursor
   */
  withCursor?: boolean
  /**
   * Set the alphanumeric keyboard
   */
  withAlphanumericKeyboard?: boolean
  /**
   * onComplete callback with otp input text
   */
  onComplete?: (otp: string) => void
}

export type OtpInputRef = {
  /**
   * Clear the otp input text
   */
  clear: () => void
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
  /**
   * Label inside the divider
   */
  label?: string
  /**
   * Label position where it will be rendered
   * @default center
   */
  labelPosition?: 'left' | 'right' | 'center'
}

export interface ShimmerViewProps extends DividerProps {
  /**
   * Set it to false to disable the animation
   * @default true
   */
  animated?: boolean
  /**
   * Set it to false to Hide the shimmer view and show it's children
   * @default true
   */
  visible?: boolean
  /**
   * Set it to true to have the circular shape
   */
  circular?: boolean
  /**
   * Border radius of the view
   */
  borderRadius?: number
  /**
   * Set it to false to disable the animation
   * @default 1000
   */
  duration?: number
  /**
   * Set the mode of the animation
   * @default fade
   */
  mode?: 'fade' | 'wave'
}

export interface CardProps extends ViewProps {
  shadow?: boolean
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
   * @default 24
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
  /**
   * Render custom icon when value is true
   */
  checkedIcon?: ReactNode
  /**
   * Render custom icon when value is false
   */
  uncheckedIcon?: ReactNode
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
  Chip: ChipProps
  SegmentedButton: SegmentedButtonProps

  View: ViewProps
  Divider: DividerProps

  ShimmerView: ShimmerViewProps
  ProgressBar: ProgressBarProps

  Icon: IconProps
  Avatar: AvatarProps

  TextInput: TextInputProps
  SearchInput: SearchInputProps

  Checkbox: CheckboxProps
  Switch: SwitchProps
  Radio: RadioProps

  Modal: ModalProps
  Popover: PopoverProps
  Tooltip: TooltipProps
  SelectItem: SelectItemProps<unknown>
  Select: SelectProps<unknown>
  MultiSelect: SelectProps<unknown>
}

export interface ModalProps extends RNModalProps {
  /**
   * Style the backdrop of the modal
   */
  backdropStyle?: StyleProp<ViewStyle>
  /**
   * content style of the Modal
   */
  contentStyle?: StyleProp<ViewStyle>
  /**
   * Callback whenever user press on the backdrop or on the android back button press
   */
  onBackdropPress?: () => void
}

export interface ModalContentProps {
  /**
   * Tittle of the modal
   */
  title?: string
  /**
   * Description text of the modal
   */
  description?: string
  /**
   * Render extra child component JSX
   */
  children?: ReactNode
  /**
   * Customize the buttons from the Button that will be shown in a row
   */
  actionButtons?: ButtonProps[]
  /**
   * container style of the ModalContent
   */
  containerStyle?: StyleProp<ViewStyle>
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
  /**
   * Popover content position
   * @default bottom
   */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * Content offset
   */
  offset?: number
  /**
   * Wrap Content the popover
   */
  wrapContent?: boolean
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

export interface TooltipProps
  extends Pick<
    PopoverProps,
    | 'visible'
    | 'contentStyle'
    | 'Target'
    | 'onBackdropPress'
    | 'position'
    | 'offset'
  > {
  /**
   * Title text for the tooltip
   */
  title: string
  /**
   * Style of the tooltip title text
   */
  titleStyle?: StyleProp<TextStyle>
}

/**
 * Start of Select Props
 */

export interface SelectItemT<ItemT> {
  /**
   * Label to show in the select
   */
  label: string
  /**
   * Any value data for select
   */
  value: ItemT

  /**
   * This will disable the item to be selected
   */
  disabled?: boolean
}

export interface SelectItemProps<ItemT> extends BaseUIProps {
  /**
   * Select Item object
   */
  item: SelectItemT<ItemT>
  /**
   * Set it to true to show the item selected
   */
  isSelected?: boolean
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

  /**
   * Render custom icon on left
   */
  leftIcon?: ReactNode
}

export type RNFlatListProps<ItemT> = Partial<
  Omit<FlatListProps<SelectItemT<ItemT>>, 'data'>
>

export interface SelectProps<ItemT>
  extends BaseUIProps,
    Pick<TextInputProps, 'placeholder' | 'disabled' | 'label'> {
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
   * Default value from the item.value
   */
  defaultValue?: ItemT

  /**
   * Set custom display value
   */
  displayValue?: string

  /**
   * Set it true to show the loader
   */
  isLoading?: boolean

  /**
   * Callback on every value change
   * @param selectedValue Clicked item.value
   * @param selectedItem Clicked item object with label and value
   */
  onValueChange?: (
    selectedValue?: ItemT,
    selectedItem?: SelectItemT<ItemT>,
    index?: number,
  ) => void

  /**
   * On clear callback
   */
  onClearPress?: () => void

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
  /**
   * Picker flat list props
   */
  pickerProps?: RNFlatListProps<ItemT>
  /**
   * Render a custom view for picker item
   */
  renderItem?: RNFlatListProps<ItemT>['renderItem']

  /**
   * Input props
   */
  inputProps?: Omit<TextInputProps, 'value' | 'defaultValue'>
}

export interface MultiSelectProps<ItemT>
  extends Omit<SelectProps<ItemT>, 'value' | 'onValueChange' | 'defaultValue'> {
  /**
   * List of selected item values
   */
  values?: ItemT[]
  /**
   * List of default item values
   */
  defaultValue?: ItemT[]
  /**
   * Callback on select item press
   * @param selectedValues selected values i.e ItemT
   * @param selectedItems selected items with label & value
   */
  onValuesChange?: (
    selectedValues: ItemT[],
    selectedItems: SelectItemT<ItemT>[],
  ) => void
  /**
   * Limit the selection to max count
   */
  maxSelectCount?: number
}

/**
 * End of Select Props
 */

export interface ProgressBarProps extends BaseUIProps {
  /**
   * Progress value for the track color
   */
  value?: number

  /**
   * Width of the progress bar
   */
  width?: number
  /**
   * height of the progress bar
   */
  height?: number
  /**
   * Background color of the unfilled color
   */
  color?: ColorValue
  /**
   * Main trackColor of the progress bar
   */
  trackColor?: ColorValue
  /**
   * Set it to true to have the infinite animation
   */
  indeterminate?: boolean
  /**
   * Reverse the direction of the progress bar
   */
  reverseDirection?: boolean
  /**
   * Style of the container view
   */
  style?: StyleProp<ViewStyle>
}
