import {StyleProp, TextStyle, ViewStyle} from 'react-native'

export type SnackbarTheme = 'light' | 'dark' | 'auto'

export interface SnackbarViewProps {
  /**
   * The main message to be displayed in the snackbar.
   */
  text: string
  /**
   * Text style for the main message in the snackbar.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Control the number of lines for the main message in the snackbar.
   */
  numberOfLines?: number

  /**
   * The theme of the snackbar, which can be 'light', 'dark', or 'auto' to match the system theme.
   *
   * @default auto
   */
  theme?: SnackbarTheme

  /**
   * The label for the action button in the snackbar. If not provided, the action button will not be displayed.
   */
  actionText?: string
  /**
   * Text style for the action button in the snackbar.
   */
  actionTextStyle?: StyleProp<TextStyle>
  /**
   * Callback function that is called when the action button in the snackbar is pressed.
   */
  onActionPress?: () => void

  /**
   * Custom style for the snackbar container.
   */
  containerStyle?: StyleProp<ViewStyle>
}

export interface SnackbarOptions extends SnackbarViewProps {
  /**
   * The offset from the top or bottom of the screen where the snackbar should appear.
   *
   * @default 100
   */
  offset?: number
  /**
   * The duration for which the snackbar should be visible, in milliseconds.
   * If not provided, it will default to 2000 milliseconds (2 seconds).
   *
   * @default 2000
   */
  duration?: number
  /**
   * The position of the snackbar on the screen.
   *
   * @default bottom
   */
  position?: 'top' | 'bottom'

  /**
   * Callback when a snackbar is shown
   */
  onShow?: () => void
  /**
   * Callback when a snackbar is going to hide
   */
  onHide?: () => void
}

export interface SnackbarHandlerOptions {
  /**
   * Show a snackbar with the given options.
   */
  show: (options: SnackbarOptions) => void
  /**
   * Hide the currently visible snackbar, if any. If there are multiple snackbar visible, it will hide the most recently shown one.
   */
  hide: () => void
}
