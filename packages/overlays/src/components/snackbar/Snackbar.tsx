import React from 'react'
import {Dimensions} from 'react-native'
import {Overlay} from '../overlay'
import SnackbarView from './SnackbarView'
import {SnackbarHandlerOptions, SnackbarOptions} from './types'

const DEFAULT_OFFSET = 100
const DEFAULT_DURATION = 2000

export const Snackbar: SnackbarHandlerOptions = {
  show: (options: SnackbarOptions) => {
    const {height: screenHeight} = Dimensions.get('window')

    const offset = options.offset ?? DEFAULT_OFFSET
    const position = options.position ?? 'bottom'

    const snackbarId = Overlay.show({
      type: 'snackbar',
      content: (
        <SnackbarView
          text={options.text}
          actionText={options.actionText}
          actionTextStyle={options.actionTextStyle}
          textStyle={options.textStyle}
          numberOfLines={options.numberOfLines}
          containerStyle={options.containerStyle}
          onActionPress={() => {
            Overlay.dismiss(snackbarId)
            options.onActionPress?.()
          }}
        />
      ),
      duration: options.duration ?? DEFAULT_DURATION,
      top: position === 'top' ? offset : screenHeight - offset,
      left: 0,
      withBackdrop: false,
      backdropBehavior: 'interactive',
      onDismiss: options.onHide,
    })
  },

  hide: () => {
    Overlay.dismissLast('snackbar')
  },
}
