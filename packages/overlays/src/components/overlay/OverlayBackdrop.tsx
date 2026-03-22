import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {OverlayBackdropProps} from './types'

function OverlayBackdrop({
  onPress,
  style,
  backdropBehavior = 'dismiss',
  ...rest
}: OverlayBackdropProps) {
  if (backdropBehavior === 'dismiss') {
    return (
      <Pressable
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
    return (
      <Pressable style={[StyleSheet.absoluteFillObject, style]} {...rest} />
    )
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
