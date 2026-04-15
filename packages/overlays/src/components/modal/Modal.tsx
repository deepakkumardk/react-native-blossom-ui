import React, {useCallback, useEffect, useRef} from 'react'
import {Animated, StyleSheet} from 'react-native'

import {
  useMergedProps,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'

import {ModalProps} from './types'
import {OverlayAnimationProps, useOverlay} from '../overlay'
import ModalView from './ModalView'

function Modal(props: ModalProps) {
  const {colors, isDark} = useBlossomTheme()

  const {show, update, dismiss} = useOverlay()
  const overlayIdRef = useRef<string | null>(null)

  const {
    visible,
    children,
    backdropBehavior = 'dismiss',
    backdropStyle,
    dismissOnBackPress,
    style,
    containerStyle,
    onDismiss,
  } = useMergedProps('Modal', props, {
    colors,
    isDark,
  })

  const renderAnimated = useCallback(
    ({progress}: OverlayAnimationProps) => {
      return (
        <Animated.View
          style={{
            opacity: progress,
          }}>
          <ModalView style={style}>{children}</ModalView>
        </Animated.View>
      )
    },
    [style, children],
  )

  const handleDismiss = useCallback(() => {
    overlayIdRef.current && dismiss(overlayIdRef.current)
    overlayIdRef.current = null
    onDismiss?.()
  }, [dismiss, onDismiss])

  useEffect(() => {
    if (visible) {
      // NOTE: fix for React hot reload issue
      if (overlayIdRef.current) return

      overlayIdRef.current = show({
        type: 'modal',
        top: 0,
        left: 0,
        withBackdrop: true,
        backdropBehavior,
        onDismiss: handleDismiss,
        dismissOnBackPress,
        backdropStyle: [styles.backdropStyle, backdropStyle],
        containerStyle: [styles.alignCenter, style],
        renderAnimated,
      })
    } else {
      handleDismiss()
    }

    // this is needed to avoid unnecessary re-renders when the modal props change
    // it also ensures that the modal is only shown or dismissed when the visible prop changes and not when any other prop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (overlayIdRef.current) {
      update(overlayIdRef.current, {
        backdropBehavior,
        backdropStyle: [styles.backdropStyle, backdropStyle],
        containerStyle: [styles.alignCenter, style],
        renderAnimated,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, backdropBehavior, backdropStyle, style, update])

  return null
}

export default Modal

const styles = StyleSheet.create({
  backdropStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  alignCenter: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
})
