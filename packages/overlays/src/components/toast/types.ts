export type ToastStatus = 'default' | 'info' | 'success' | 'warning' | 'error'

export interface ToastViewProps {
  message: string
  description?: string
  status?: ToastStatus
  shouldUseNativeAndroidToast?: boolean
}

export type AndroidToastViewProps = Pick<
  ToastOptions,
  'message' | 'description'
>

export interface ToastOptions {
  message: string
  description?: string
  status?: ToastStatus
  offset?: number
  duration?: number
  position?: 'top' | 'bottom'
  onShow?: () => void
  onHide?: () => void
}

export interface ToastHandlerOptions {
  show: (options: ToastOptions) => void
  hide: () => void
}
