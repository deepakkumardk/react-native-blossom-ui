import React, {useEffect, useMemo, useRef} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {ShimmerViewProps} from '../types'
import {useMergedProps} from '../../common'
import View from './View'

/**
 * A Shimmer Animation view to use in place of skeleton as a placeholder until the api response comes in
 */
const ShimmerView = (props: ShimmerViewProps) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    width = '100%',
    height = 10,
    visible = true,
    animated = true,
    circular,
    duration = 1000,
    color = colors.background200,
    borderRadius = options?.borderRadius,
    ...rest
  } = useMergedProps('ShimmerView', props, {colors, isDark})

  const animation = useRef(new Animated.Value(1)).current

  const animationLoop = useMemo(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 0,
            easing: Easing.linear,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            easing: Easing.linear,
            duration,
            useNativeDriver: true,
          }),
        ]),
      ),
    [animation, duration],
  )

  useEffect(() => {
    if (!visible) return
    if (animated) {
      animationLoop.start()
    } else {
      animationLoop.reset()
    }
  }, [animationLoop, animated, visible])

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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          borderRadius: parseInt(height, 10),
        },
        {
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
      {visible ? null : rest.children}
    </Animated.View>
  )
}

export default ShimmerView

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
})
