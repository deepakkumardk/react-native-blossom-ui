import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {Overlay} from '../overlay'
import ActionSheetView from './ActionSheetView'
import {ActionSheetHandlerOptions, ActionSheetOptions} from './types'

export const ActionSheet: ActionSheetHandlerOptions = {
  show: (options: ActionSheetOptions) => {
    Overlay.show({
      type: 'sheet',
      top: 0,
      left: 0,
      withBackdrop: true,
      backdropBehavior: 'dismiss',
      onDismiss: options.onHide,
      backdropStyle: styles.backdropStyle,
      contentStyle: styles.alignBottom,

      renderAnimated: ({progress, requestDismiss}) => {
        const translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [120, 0],
        })

        return (
          <Animated.View
            style={{
              opacity: progress,
              transform: [
                {
                  translateY,
                },
              ],
            }}>
            <ActionSheetView
              title={options.title}
              titleStyle={options.titleStyle}
              message={options.message}
              messageStyle={options.messageStyle}
              options={options.options}
              withCancelButton={options.withCancelButton}
              containerStyle={options.containerStyle}
              onItemPress={(key, index) => {
                requestDismiss()
                options.onItemPress?.(key, index)
              }}
            />
          </Animated.View>
        )
      },
    })
  },

  hide: () => {
    Overlay.dismissLast('sheet')
  },
}

const styles = StyleSheet.create({
  alignBottom: {
    top: undefined,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backdropStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
})
