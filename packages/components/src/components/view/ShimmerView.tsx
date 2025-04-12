import React, {useEffect, useMemo, useRef} from 'react'
import {Animated, Easing, StyleSheet, useWindowDimensions} from 'react-native'

import {useBlossomTheme} from '../../context'
import {ShimmerViewProps} from '../types'
import {useMergedProps} from '../../common'
import View from './View'
import {getAlphaColor} from '../utils'

/**
 * A Shimmer Animation view to use in place of skeleton as a placeholder until the api response comes in
 */
const ShimmerView = (props: ShimmerViewProps) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    width,
    height = 10,
    visible = true,
    animated = true,
    circular,
    duration = 1000,
    mode = 'fade',
    color = colors.background200,
    borderRadius = options?.borderRadius,
    ...rest
  } = useMergedProps('ShimmerView', props, {colors, isDark})

  const {width: deviceWidth} = useWindowDimensions()

  const animation = useRef(new Animated.Value(mode === 'fade' ? 1 : 0)).current

  const fadeLoop = useMemo(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 0,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ),
    [animation, duration],
  )

  const waveLoop = useMemo(
    () =>
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ),
    [animation, duration],
  )

  useEffect(() => {
    if (!visible) return

    if (animated) {
      if (mode === 'fade') {
        waveLoop.reset()
        fadeLoop.start()
      } else {
        fadeLoop.reset()
        waveLoop.start()
      }
    } else {
      mode === 'fade' ? fadeLoop.reset() : waveLoop.reset()
    }
  }, [fadeLoop, animated, visible, mode, waveLoop])

  if (!visible) {
    return <View {...rest} />
  }

  return (
    <Animated.View
      {...rest}
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor: color,
          borderRadius,
        },
        circular && {
          width: height,
          height,
          borderRadius: parseInt(String(height), 10),
        },
        mode === 'fade' && {
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 1],
          }),
          backgroundColor: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.backgroundTransparent500, color],
          }),
        },
        rest.style,
      ]}>
      {visible ? (
        mode === 'wave' ? (
          <Animated.View
            style={[
              styles.pulseView,
              {
                width: deviceWidth * 0.1,
                backgroundColor: getAlphaColor(colors.background100, 0.6),
              },
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-deviceWidth, deviceWidth],
                    }),
                  },
                ],
              },
            ]}
          />
        ) : null
      ) : (
        rest.children
      )}
    </Animated.View>
  )
}

export default ShimmerView

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    overflow: 'hidden',
  },
  pulseView: {
    minWidth: 20,
    height: '100%',
    opacity: 0.5,

    shadowColor: '#ffffff',
    shadowOffset: {width: 50, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
})
