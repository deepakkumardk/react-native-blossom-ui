import React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {OverlayNode} from '../types'
import OverlayBackdrop from './OverlayBackdrop'

function OverlayContainer({
  node,
  stackIndex,
}: {
  node: OverlayNode
  stackIndex: number
}) {
  const zIndex = 100 + stackIndex

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={node.disableBackgroundInteraction ? 'auto' : 'box-none'}
      // pointerEvents={node.backdropBehavior === 'block' ? 'auto' : 'box-none'}
    >
      {node.withBackdrop && (
        <OverlayBackdrop
          onPress={node.onDismiss}
          // backdropBehavior={node.backdropBehavior}
          disableBackgroundInteraction={node.disableBackgroundInteraction}
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
