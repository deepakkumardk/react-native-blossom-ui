import {StyleProp, ViewStyle} from 'react-native'

export interface BottomSheetProps {
  /**
   * Whether the BottomSheet is visible or not.
   */
  visible: boolean
  /**
   * The content to be displayed inside the BottomSheet.
   */
  children: React.ReactNode
  /**
   * Callback function that is called when the BottomSheet requests to be dismissed.
   * This can happen when the user taps on the backdrop (if `backdropBehavior` is set to 'dismiss') or when the `duration` expires.
   */
  onDismiss: () => void
  /**
   * Control the behavior of the backdrop when the BottomSheet is visible.
   * - 'interactive': The backdrop will be rendered and will allow interactions with it. Tapping on the backdrop will trigger the `onDismiss` callback.
   * - 'block': The backdrop will be rendered and will block interactions with it. Tapping on the backdrop will not do anything.
   * - 'dismiss': The backdrop will be rendered and tapping on it will trigger the `onDismiss` callback, but it will not allow any interactions with the backdrop itself.
   *
   * @default 'interactive'
   */
  backdropBehavior?: 'interactive' | 'block' | 'dismiss'
  /**
   * style for the container of the BottomSheet
   */
  style?: StyleProp<ViewStyle>
  /**
   * style for the backdrop of the BottomSheet
   */
  backdropStyle?: StyleProp<ViewStyle>
}
