import React from 'react'
import {Dimensions} from 'react-native'
import {Overlay} from '../overlay'
import ToastView from './ToastView'
import {ToastHandlerOptions, ToastOptions} from './types'

const DEFAULT_OFFSET = 150
const DEFAULT_DURATION = 2000

export const Toast: ToastHandlerOptions = {
  show: (options: string | ToastOptions) => {
    const {height: screenHeight} = Dimensions.get('window')

    const toastOptions: ToastOptions =
      typeof options === 'string'
        ? {message: options, position: 'bottom'}
        : options
    const offset = toastOptions.offset ?? DEFAULT_OFFSET
    const position = toastOptions.position ?? 'bottom'

    Overlay.show({
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

  hide: () => {
    Overlay.dismissLast('toast')
  },
}
