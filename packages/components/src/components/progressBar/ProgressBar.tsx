import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'

import {View} from '../view'
import {BlossomSize, useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import {ProgressBarProps} from '../types'
import {getStatusColorName} from '../utils'

/**
 * Linear Progress bar component with Animated animation
 */
const ProgressBar = (props: ProgressBarProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    value = 0,
    color = colors.background200,
    trackColor,
    width,
    height,
    indeterminate,
    // TODO: inverted
    reverseDirection,
    style,
    status = 'primary',
    size = 'medium',
  } = useMergedProps('ProgressBar', props, {colors, isDark})

  const progressValue = useRef(new Animated.Value(0)).current

  const [progressBarWidth, setProgressBarWidth] = useState(0)

  const animationLoop = useMemo(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(progressValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ),
    [progressValue],
  )

  useEffect(() => {
    if (indeterminate) {
      animationLoop.start()
    } else {
      animationLoop.reset()
    }
  }, [animationLoop, indeterminate])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
          width,
          height: height || sizeMap[size],
          borderRadius: height || sizeMap[size],
        },
        reverseDirection && styles.reverse,
        style,
      ]}
      onLayout={(e) => {
        setProgressBarWidth(e.nativeEvent.layout.width)
      }}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor:
              trackColor || colors[getStatusColorName(status, isDark)],
            width: indeterminate ? '40%' : `${value === 0 ? 0 : value}%`,
            height: height || sizeMap[size],
            borderRadius: height || sizeMap[size],
          },
          {
            transform: indeterminate
              ? [
                  {
                    translateX: progressValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: reverseDirection
                        ? [progressBarWidth, -progressBarWidth * 0.9]
                        : [-progressBarWidth * 0.5, progressBarWidth],
                    }),
                  },
                  {
                    scaleX: progressValue.interpolate({
                      inputRange: [0, 0.4, 0.75, 0.9, 1],
                      outputRange: [0.4, 1, 0.4, 0.2, 0.1],
                    }),
                  },
                ]
              : [],
          },
        ]}
      />
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  container: {
    // NOTE: this height is kind of weird to be here to make the track color view to work!!
    height: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 8,
  medium: 10,
  large: 12,
}
