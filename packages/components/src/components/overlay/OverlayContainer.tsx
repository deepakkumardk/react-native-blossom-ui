import React, {useEffect} from 'react'
import {Animated, BackHandler, StyleSheet, View} from 'react-native'
import {OverlayNode} from '../types'
import OverlayBackdrop from './OverlayBackdrop'
import {useOverlay} from './useOverlay'

function OverlayContainer({
  node,
  stackIndex,
}: {
  node: OverlayNode
  stackIndex: number
}) {
  const zIndex = 100 + stackIndex
  const {dismiss} = useOverlay()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined
    if (node.duration) {
      timeoutId = setTimeout(() => dismiss(node.id), node.duration)
      return () => clearTimeout(timeoutId)
    }
    return undefined
  }, [dismiss, node.duration, node.id])

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={
        node.backdropBehavior === 'interactive' ? 'box-none' : 'auto'
      }>
      {node.withBackdrop && (
        <OverlayBackdrop
          onPress={() => {
            dismiss(node.id)
            node?.onDismiss?.()
          }}
          backdropBehavior={node.backdropBehavior}
          style={node.backdropStyle}
        />
      )}

      <View
        pointerEvents="auto"
        // pointerEvents="box-none"
        style={{
          position: 'absolute',
          top: node.top,
          left: node.left,
          zIndex,
          overflow: 'hidden',
        }}>
        <Animated.View>{node.content}</Animated.View>
      </View>
    </View>
  )
}

export default OverlayContainer
