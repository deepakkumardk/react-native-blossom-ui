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
          <ModalView containerStyle={containerStyle}>{children}</ModalView>
        </Animated.View>
      )
    },
    [containerStyle, children],
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
        type: 'sheet',
        top: 0,
        left: 0,
        withBackdrop: true,
        backdropBehavior,
        onDismiss: handleDismiss,

        backdropStyle: [styles.backdropStyle, backdropStyle],
        containerStyle: [styles.alignCenter],
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
        renderAnimated,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, backdropBehavior, backdropStyle, update])

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

    justifyContent: 'center',
    alignItems: 'center',
  },
})
