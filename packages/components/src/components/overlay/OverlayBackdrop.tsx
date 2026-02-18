import React from 'react'
import {Pressable, PressableProps, StyleSheet, ViewProps} from 'react-native'
import {OverlayNode} from '../types'
import {View} from '../view'

function OverlayBackdrop({
  onPress,
  style,
  disableBackgroundInteraction,
  // backdropBehavior = 'dismiss',
  ...rest
}: PressableProps &
  ViewProps &
  Pick<OverlayNode, 'disableBackgroundInteraction'>) {
  if (disableBackgroundInteraction) {
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

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFillObject, style]}
      {...rest}
    />
  )
}

export default OverlayBackdrop
