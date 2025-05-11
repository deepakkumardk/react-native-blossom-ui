import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Animated, StyleSheet} from 'react-native'

import {View} from '../view'
import {AnimatedPlaceholderProps} from '../types'
import {useBlossomTheme} from '../../context'

const HEIGHT_MULTIPLIER_UP = 1.6
const HEIGHT_MULTIPLIER_DOWN = 1.8

/**
 * Animated placeholder component for text input
 */
function AnimatedPlaceholder(props: AnimatedPlaceholderProps) {
  const {colors} = useBlossomTheme()

  const {
    placeholders = [],
    visible = true,
    duration = 500,
    containerStyle,
    textStyle,
  } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewHeight, setViewHeight] = useState(48)

  const translateY = useRef(new Animated.Value(0)).current

  const animationLoop = useMemo(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 1,
            duration,
            delay: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 2,
            duration: 10,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 3,
            duration,
            useNativeDriver: true,
          }),
        ]),
      ),
    [duration, translateY],
  )

  useEffect(() => {
    if (visible) {
      animationLoop.start()
    } else {
      animationLoop.reset()
    }

    return () => {
      animationLoop.reset()
    }
  }, [animationLoop, duration, translateY, visible])

  useEffect(() => {
    translateY.addListener(({value}) => {
      if (value === 2) {
        // NOTE: 0.5 is used to fix double animation issue
        setCurrentIndex((prevIndex) => (prevIndex + 0.5) % placeholders.length)
      }
    })

    return () => {
      animationLoop.reset()
      translateY.removeAllListeners()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible || placeholders.length === 0) return null

  return (
    <View
      style={[styles.innerContainer, containerStyle]}
      onLayout={(e) => {
        const {height} = e.nativeEvent.layout
        setViewHeight(height)
      }}>
      <Animated.Text
        style={[
          {
            color: colors.text100,
          },
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1, 2, 3],
                  outputRange: [
                    0,
                    -viewHeight * HEIGHT_MULTIPLIER_UP,
                    viewHeight * HEIGHT_MULTIPLIER_DOWN,
                    0,
                  ],
                }),
              },
            ],
          },
          {
            opacity: translateY.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: [1, 0.5, 0.5, 1],
            }),
          },
          textStyle,
        ]}>
        {placeholders[currentIndex] || ''}
      </Animated.Text>
    </View>
  )
}

export default AnimatedPlaceholder

const styles = StyleSheet.create({
  innerContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
})
