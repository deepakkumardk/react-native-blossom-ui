import React from 'react'
import {Animated, Dimensions, StyleSheet} from 'react-native'
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

    Overlay.show({
      type: 'snackbar',
      duration: options.duration ?? DEFAULT_DURATION,
      top: position === 'top' ? offset : screenHeight - offset,
      left: 0,
      withBackdrop: false,
      backdropBehavior: 'interactive',
      onDismiss: options.onHide,
      contentStyle: styles.horizontalCenter,

      renderAnimated: ({progress, requestDismiss}) => {
        const scale = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        })

        const translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0],
        })

        const shadowOpacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.25],
        })

        return (
          <Animated.View
            style={{
              opacity: progress,
              shadowOpacity,
              transform: [
                {
                  translateY,
                },
                {
                  scale,
                },
              ],
            }}>
            <SnackbarView
              text={options.text}
              actionText={options.actionText}
              actionTextStyle={options.actionTextStyle}
              textStyle={options.textStyle}
              numberOfLines={options.numberOfLines}
              containerStyle={options.containerStyle}
              onActionPress={() => {
                requestDismiss()
                options.onActionPress?.()
              }}
              theme={options.theme}
            />
          </Animated.View>
        )
      },
    })
  },

  hide: () => {
    Overlay.dismissLast('snackbar')
  },
}

const styles = StyleSheet.create({
  horizontalCenter: {
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})
