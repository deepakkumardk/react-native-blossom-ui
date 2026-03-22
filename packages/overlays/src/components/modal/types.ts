import {StyleProp, ViewStyle} from 'react-native'

export interface ModalProps {
  /**
   * Whether the Modal is visible or not.
   */
  visible: boolean
  /**
   * The content to be displayed inside the Modal.
   */
  children: React.ReactNode
  /**
   * Callback function that is called when the Modal is dismissed.
   * This is invoked whenever the Modal becomes not visible, for example when the user taps
   * on the backdrop (if `backdropBehavior` is set to 'dismiss') or when it is dismissed
   * programmatically.
   */
  onDismiss: () => void
  /**
   * Control the behavior of the backdrop when the Modal is visible.
   * - 'interactive': The backdrop will be rendered and will allow user interactions on the backdrop itself.
   * - 'block': The backdrop will be rendered and will block interactions with it. Tapping on the backdrop will not do anything.
   * - 'dismiss': The backdrop will be rendered and used solely as a tap-to-dismiss surface. Tapping on the backdrop will trigger the `onDismiss` callback, but no other interactions with the backdrop are allowed.
   *
   * @default dismiss
   */
  backdropBehavior?: 'interactive' | 'block' | 'dismiss'
  /**
   * Style for the container of the Modal.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style for the backdrop of the Modal.
   */
  backdropStyle?: StyleProp<ViewStyle>
}
