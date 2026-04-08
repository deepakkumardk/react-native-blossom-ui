import {ButtonProps} from '@react-native-blossom-ui/components'
import {StyleProp, ViewStyle} from 'react-native'

export interface DialogBaseProps {
  /**
   * Whether the Dialog is visible or not.
   */
  visible: boolean
  /**
   * The content of the Dialog.
   */
  children?: React.ReactNode
  /**
   * Callback function that is called when the Dialog is dismissed.
   * This is invoked whenever the Dialog becomes not visible, for example when the user taps
   * on the backdrop (if `backdropBehavior` is set to 'dismiss') or when it is dismissed
   * programmatically.
   */
  onDismiss: () => void
  /**
   * Control the behavior of the backdrop when the Dialog is visible.
   * - 'interactive': The backdrop will be rendered and will allow user interactions on the backdrop itself.
   * - 'block': The backdrop will be rendered and will block interactions with it. Tapping on the backdrop will not do anything.
   * - 'dismiss': The backdrop will be rendered and used solely as a tap-to-dismiss surface. Tapping on the backdrop will trigger the `onDismiss` callback, but no other interactions with the backdrop are allowed.
   *
   * @default dismiss
   */
  backdropBehavior?: 'interactive' | 'block' | 'dismiss'
  /**
   * Style for the container of the Dialog.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style for the backdrop of the Dialog.
   */
  backdropStyle?: StyleProp<ViewStyle>
}

export interface DialogProps extends Omit<DialogBaseProps, 'children'> {
  /**
   * icon to be displayed at the top of the Dialog
   */
  icon?: React.ReactNode
  /**
   * title to be displayed below the icon
   */
  title?: string
  /**
   * description to be displayed below the title
   */
  description?: string
  /**
   * Actions to be displayed at the bottom of the Dialog.
   *
   * Multiple actions are rendered together in the Dialog's action area in the same order
   * as they are provided in the array.
   *
   * If this prop is omitted or an empty array is provided, no action buttons are rendered.
   */
  actions?: ButtonProps[]
}
