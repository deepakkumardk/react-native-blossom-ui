import React from 'react'
import {Dimensions, Easing} from 'react-native'
import {Overlay} from '../overlay'
import ActionSheetView from './ActionSheetView'
import {ActionSheetHandlerOptions, ActionSheetOptions} from './types'

export const ActionSheet: ActionSheetHandlerOptions = {
  show: (options: ActionSheetOptions) => {
    // const {height: screenHeight} = Dimensions.get('window')

    const ActionSheetId = Overlay.show({
      type: 'sheet',
      content: (
        <ActionSheetView
          title={options.title}
          titleStyle={options.titleStyle}
          message={options.message}
          messageStyle={options.messageStyle}
          options={options.options}
          withCancelButton={options.withCancelButton}
          containerStyle={options.containerStyle}
          onItemPress={(key, index) => {
            Overlay.dismiss(ActionSheetId)
            options.onItemPress?.(key, index)
          }}
        />
      ),
      top: 0,
      left: 0,
      withBackdrop: true,
      backdropBehavior: 'dismiss',
      onDismiss: options.onHide,
      backdropStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      animationConfig: {
        duration: 200,
        easing: Easing.out(Easing.ease),
      },
    })
  },

  hide: () => {
    Overlay.dismissLast('sheet')
  },
}
