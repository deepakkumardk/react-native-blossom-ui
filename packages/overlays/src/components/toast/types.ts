export type ToastStatus = 'default' | 'info' | 'success' | 'warning' | 'error'

export type ToastTheme = 'light' | 'dark' | 'auto'

export interface ToastViewProps {
  /**
   * The main message to be displayed in the toast.
   */
  message: string
  /**
   * An optional description providing additional details about the toast message.
   */
  description?: string
  /**
   * The status of the toast, which can be used to indicate the type of message.
   *
   * @default default
   */
  status?: ToastStatus
  /**
   * Whether to use the native Android toast implementation.
   *
   * @default false
   */
  shouldUseNativeAndroidToast?: boolean
  /**
   * The theme of the toast, which can be 'light', 'dark', or 'auto' to match the system theme.
   *
   * @default auto
   */
  theme?: ToastTheme
}

export type AndroidToastViewProps = Pick<
  ToastOptions,
  'message' | 'description'
>

export interface ToastOptions {
  /**
   * The main message to be displayed in the toast.
   */
  message: string
  /**
   * An optional description providing additional details about the toast message.
   */
  description?: string
  /**
   * The status of the toast, which can be used to indicate the type of message.
   *
   * @default default
   */
  status?: ToastStatus
  /**
   * The offset from the top or bottom of the screen where the toast should appear.
   */
  offset?: number
  /**
   * The duration for which the toast should be visible, in milliseconds.
   */
  duration?: number
  /**
   * The position of the toast on the screen.
   *
   * @default bottom
   */
  position?: 'top' | 'bottom'
  /**
   * The theme of the toast, which can be 'light', 'dark', or 'auto' to match the system theme.
   *
   * @default auto
   */
  theme?: ToastTheme
  /**
   * Callback function that is called when the toast is shown.
   */
  onShow?: () => void
  /**
   * Callback function that is called when the toast is hidden.
   */
  onHide?: () => void
}

export interface ToastHandlerOptions {
  /**
   * Show a toast with the given options.
   */
  show: (options: ToastOptions) => void
  /**
   * Hide the currently visible toast, if any. If there are multiple toast visible, it will hide the most recently shown one.
   */
  hide: () => void
}
