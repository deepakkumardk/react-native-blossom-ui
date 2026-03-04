import React, {useCallback} from 'react'
import {useWindowDimensions} from 'react-native'
import {useOverlay} from '../overlay'
import ToastView from './ToastView'
import {ToastStatus} from './types'

interface ToastOptions {
  message: string
  description?: string
  status?: ToastStatus
  offset?: number
  duration?: number
  position?: 'top' | 'bottom'
  onShow?: () => void
  onHide?: () => void
}

const DEFAULT_OFFSET = 150
const DEFAULT_DURATION = 2000

export function useToast() {
  const {show: showOverlay} = useOverlay()
  const {height: screenHeight} = useWindowDimensions()

  const show = useCallback(
    (options: string | ToastOptions) => {
      const toastOptions: ToastOptions =
        typeof options === 'string'
          ? {message: options, position: 'bottom'}
          : options
      const offset = toastOptions.offset ?? DEFAULT_OFFSET
      const position = toastOptions.position ?? 'bottom'

      showOverlay({
        type: 'toast',
        content: (
          <ToastView
            message={toastOptions.message}
            description={toastOptions.description}
            status={toastOptions.status}
          />
        ),
        duration: toastOptions.duration ?? DEFAULT_DURATION,
        top: position === 'top' ? offset : screenHeight - offset,
        left: 0,
        withBackdrop: false,
        backdropBehavior: 'interactive',
        onDismiss: toastOptions.onHide,
      })
    },
    [screenHeight, showOverlay],
  )

  return {show}
}
