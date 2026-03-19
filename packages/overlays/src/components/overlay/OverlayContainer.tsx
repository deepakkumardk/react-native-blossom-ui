import React, {useEffect, useCallback} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import OverlayBackdrop from './OverlayBackdrop'
import {useOverlay} from './useOverlay'
import {useAnimatedController} from './useAnimatedController'
import {OverlayNode} from './types'

function OverlayContainer({
  node,
  stackIndex,
}: {
  node: OverlayNode
  stackIndex: number
}) {
  const zIndex = 100 + stackIndex
  const {dismiss, remove} = useOverlay()

  const {animatedValue, phase} = useAnimatedController(
    !!node.visible,
    node.animationConfig,
  )

  const requestDismiss = useCallback(() => {
    dismiss(node.id)
  }, [dismiss, node.id])

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
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={
        node.backdropBehavior === 'interactive' ? 'box-none' : 'auto'
      }>
      {node.withBackdrop && (
        <OverlayBackdrop
          onPress={requestDismiss}
          backdropBehavior={node.backdropBehavior}
          style={node.backdropStyle}
        />
      )}

      <View
        pointerEvents="auto"
        style={[
          styles.animatedContainer,
          {
            top: node.top,
            left: node.left,
            zIndex,
          },
          node.containerStyle,
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
  },
})
