import React, {useEffect, useCallback, useMemo} from 'react'
import {Animated, Platform, StyleSheet, View} from 'react-native'
import OverlayBackdrop from './OverlayBackdrop'
import {useOverlay} from './useOverlay'
import {useAnimatedController} from './useAnimatedController'
import {OverlayContainerProps} from './types'

function OverlayContainer({node, stackIndex}: OverlayContainerProps) {
  const zIndex = 100 + stackIndex
  const {dismiss, remove} = useOverlay()

  const {animatedValue, phase} = useAnimatedController(
    !!node.visible,
    node.animationConfig,
  )

  const requestDismiss = useCallback(() => {
    dismiss(node.id)
  }, [dismiss, node.id])

  const pointerEvents = useMemo(() => {
    if (node.backdropBehavior === 'interactive') {
      return 'box-none'
    }

    return 'auto'
  }, [node.backdropBehavior])

  useEffect(() => {
    if (!node.duration) return undefined

    const timeoutId = setTimeout(() => {
      requestDismiss()
    }, node.duration)

    return () => clearTimeout(timeoutId)
  }, [node.duration, requestDismiss])

  useEffect(() => {
    if (phase === 'exited') {
      remove(node.id)
      node.onDismiss?.()
    }
  }, [phase, remove, node])

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={pointerEvents}>
      {node.withBackdrop && (
        <OverlayBackdrop
          onPress={requestDismiss}
          backdropBehavior={node.backdropBehavior}
          style={node.backdropStyle}
        />
      )}

      <View
        // Use "box-none" so the overlay container itself doesn't block touches,
        // while still allowing its children to receive touch events.
        pointerEvents="box-none"
        style={[
          styles.animatedContainer,
          {
            top: node.top,
            left: node.left,
            zIndex,
          },
          node.contentStyle,
        ]}>
        {node.renderAnimated ? (
          node.renderAnimated({progress: animatedValue, phase, requestDismiss})
        ) : (
          <Animated.View style={{opacity: animatedValue}}>
            {node.content}
          </Animated.View>
        )}
      </View>
    </View>
  )
}

export default OverlayContainer

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
    position: 'absolute',
    // Disable scroll for web overlays to prevent background scrolling when an overlay is open
    ...(Platform.OS === 'web' && {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      position: 'fixed' as any,
    }),
  },
})
