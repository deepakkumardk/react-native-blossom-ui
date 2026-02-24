import React from 'react'
import {Pressable, PressableProps, StyleSheet, ViewProps} from 'react-native'
import {OverlayNode} from '../types'
import {View} from '../view'

function OverlayBackdrop({
  onPress,
  style,
  backdropBehavior = 'dismiss',
  ...rest
}: PressableProps & ViewProps & Pick<OverlayNode, 'backdropBehavior'>) {
  if (backdropBehavior === 'dismiss') {
    return (
      <Pressable
        // pointerEvents="box-only"
        accessibilityRole="button"
        onPress={onPress}
        style={(state) => [
          StyleSheet.absoluteFillObject,
          typeof style === 'function' ? style(state) : style,
        ]}
        {...rest}
      />
    )
  }

  if (backdropBehavior === 'block') {
    return <View style={[StyleSheet.absoluteFillObject, style]} {...rest} />
  }

  if (backdropBehavior === 'interactive') {
    return (
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, style]}
        {...rest}
      />
    )
  }

  return null
}

export default OverlayBackdrop
