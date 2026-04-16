import React, {useCallback, useEffect, useRef} from 'react'
import {Animated, StyleSheet} from 'react-native'

import {
  useMergedProps,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'

import {BottomSheetProps} from './types'
import {OverlayAnimationProps, useOverlay} from '../overlay'
import BottomSheetView from './BottomSheetView'

function BottomSheet(props: BottomSheetProps) {
  const {colors, isDark} = useBlossomTheme()

  const {show, update, dismiss} = useOverlay()
  const overlayIdRef = useRef<string | null>(null)

  const {
    visible,
    children,
    backdropBehavior = 'dismiss',
    backdropStyle,
    style,
    onDismiss,
  } = useMergedProps('BottomSheet', props, {
    colors,
    isDark,
  })

  const renderAnimated = useCallback(
    ({progress}: OverlayAnimationProps) => {
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
          <BottomSheetView style={style}>{children}</BottomSheetView>
        </Animated.View>
      )
    },
    [style, children],
  )

  useEffect(() => {
    if (visible) {
      overlayIdRef.current = show({
        type: 'sheet',
        top: 0,
        left: 0,
        withBackdrop: true,
        backdropBehavior,
        onDismiss: () => {
          overlayIdRef.current = null
          onDismiss?.()
        },
        backdropStyle: [styles.backdropStyle, backdropStyle],
        contentStyle: [styles.alignBottom, style],
        renderAnimated,
      })
    } else if (overlayIdRef.current) {
      dismiss(overlayIdRef.current)
      overlayIdRef.current = null
      onDismiss?.()
    }

    // this is needed to avoid unnecessary re-renders the bottom sheet props changes
    // it also ensures that the bottom sheet is only shown or dismissed when the visible prop changes and not when any other prop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (overlayIdRef.current) {
      update(overlayIdRef.current, {
        backdropBehavior,
        backdropStyle: [styles.backdropStyle, backdropStyle],
        contentStyle: [styles.alignBottom, style],
        renderAnimated,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, backdropBehavior, backdropStyle, style, update])

  return null
}

export default BottomSheet

const styles = StyleSheet.create({
  backdropStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  alignBottom: {
    top: undefined,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
