import React, {useEffect} from 'react'
import {Platform, Pressable, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {OverlayBackdropProps} from './types'

function OverlayBackdrop({
  onPress,
  style,
  backdropBehavior = 'dismiss',
  ...rest
}: OverlayBackdropProps) {
  useEffect(() => {
    // Disable body scroll on web for non-interactive backdrops
    if (Platform.OS === 'web' && backdropBehavior !== 'interactive') {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalOverflow
      }
    }

    return undefined
  }, [backdropBehavior])

  if (backdropBehavior === 'dismiss') {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={(state) => [
          styles.backdrop,
          typeof style === 'function' ? style(state) : style,
        ]}
        {...rest}
      />
    )
  }

  if (backdropBehavior === 'block') {
    return <Pressable style={[styles.backdrop, style]} {...rest} />
  }

  if (backdropBehavior === 'interactive') {
    return (
      <View pointerEvents="none" style={[styles.backdrop, style]} {...rest} />
    )
  }

  return null
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    // Disable scroll for web overlays to prevent background scrolling when an overlay is open
    ...(Platform.OS === 'web' && {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      position: 'fixed' as any,
    }),
  },
})

export default OverlayBackdrop
