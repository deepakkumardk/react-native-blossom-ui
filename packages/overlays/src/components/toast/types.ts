export type ToastStatus = 'default' | 'info' | 'success' | 'warning' | 'error'

export interface ToastViewProps {
  message: string
  description?: string
  status?: ToastStatus
  shouldUseNativeAndroidToast?: boolean
}

export interface AndroidToastViewProps {
  message: string
  description?: string
}
