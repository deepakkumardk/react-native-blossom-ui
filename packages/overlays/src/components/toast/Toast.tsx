import React from 'react'
import {Animated, Dimensions, Easing, StyleSheet} from 'react-native'
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
          theme={toastOptions.theme}
        />
      ),
      duration: toastOptions.duration ?? DEFAULT_DURATION,
      top: position === 'top' ? offset : screenHeight - offset,
      left: 0,
      withBackdrop: false,
      backdropBehavior: 'interactive',
      onDismiss: toastOptions.onHide,
      contentStyle: styles.horizontalCenter,
      animationConfig: {
        enter: (value: Animated.Value) =>
          Animated.timing(value, {
            toValue: 1,
            duration: 250,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),

        exit: (value: Animated.Value) =>
          Animated.timing(value, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
      },
    })
  },

  hide: () => {
    Overlay.dismissLast('toast')
  },
}

const styles = StyleSheet.create({
  horizontalCenter: {
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})
