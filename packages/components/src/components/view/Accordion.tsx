import React, {useEffect, useState, useRef, useCallback} from 'react'
import {
  Pressable,
  StyleSheet,
  Animated,
  UIManager,
  View as RNView,
  LayoutChangeEvent,
} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import View from './View'
import {AccordionProps} from '../types'
import {Icon} from '../icon'
import {Text} from '../text'
import Spacer from './Spacer'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

/**
 * Collapsed components with auto open and close
 */
const Accordion = (props: AccordionProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    isOpen,
    title,
    description,
    content,
    children,
    left,
    right,
    chevron,
    containerStyle,
    headerStyle,
    onPress,
    transitionDuration = 300,
  } = useMergedProps('Accordion', props, {colors, isDark})

  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)

  const animatedHeight = useRef(new Animated.Value(0)).current
  const rotateAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setIsExpanded(!!isOpen)
  }, [isOpen])

  const toggleAccordion = useCallback(() => {
    setIsExpanded((prev) => !prev)
    onPress?.()

    const toValue = isExpanded ? 0 : 1

    Animated.timing(animatedHeight, {
      toValue: toValue * contentHeight,
      duration: transitionDuration,
      useNativeDriver: false,
    }).start()

    // Don't trigger rotate animation if chevron is present as user will handle it
    if (chevron) return

    Animated.timing(rotateAnimation, {
      toValue,
      duration: transitionDuration,
      useNativeDriver: true,
    }).start()
  }, [
    chevron,
    isExpanded,
    onPress,
    animatedHeight,
    contentHeight,
    transitionDuration,
    rotateAnimation,
  ])

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout
    if (height > 0) {
      setContentHeight(height)
    }
  }, [])

  const chevronRotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <View style={containerStyle}>
      <Pressable
        accessibilityRole="button"
        style={[styles.titleRow, headerStyle]}
        onPress={toggleAccordion}>
        {left}
        <View style={[styles.titleColumn, !left && styles.titleLeft]}>
          {typeof title === 'string' ? (
            <Text typography="b2">{title}</Text>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <Text typography="l3" style={{color: colors.text400}}>
              {description}
            </Text>
          ) : (
            description
          )}
        </View>
        {right}
        {chevron?.(isExpanded) || (
          <Animated.View style={{transform: [{rotate: chevronRotation}]}}>
            <Icon
              family="Ionicons"
              name="chevron-down"
              color={colors.text200}
            />
          </Animated.View>
        )}
      </Pressable>

      <Animated.View
        style={[
          {
            height: animatedHeight,
          },
          styles.contentAnimatedView,
        ]}>
        <RNView style={styles.contentView} onLayout={onLayout}>
          <Spacer />
          {typeof content === 'string' ? <Text>{content}</Text> : children}
        </RNView>
      </Animated.View>
    </View>
  )
}

export default Accordion

const styles = StyleSheet.create({
  contentView: {
    position: 'absolute',
  },
  contentAnimatedView: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  titleColumn: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: 'transparent',
  },
  titleLeft: {
    marginStart: 0,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
})
