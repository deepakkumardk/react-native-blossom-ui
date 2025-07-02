import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Animated, LayoutChangeEvent, StyleSheet} from 'react-native'

import {getBorderColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {BaseBooleanFieldProps} from '../types'
import {View} from '../view'
import SizedText from '../text/SizedText'

/**
 * Centralized component to have blueprint of boolean based fields
 */
const BaseBooleanField = (props: BaseBooleanFieldProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    label,
    caption,
    error,
    disabled,
    position = 'left',
    adjacent = true,
    containerStyle,
    labelStyle,
    captionStyle,
    errorStyle,
    status = 'accent',
    size = 'medium',
    children,
  } = props

  const [errorContentHeight, setErrorContentHeight] = useState(0)
  const animatedHeight = useRef(new Animated.Value(0)).current
  const animatedOpacity = useRef(new Animated.Value(0)).current

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout
    if (height > 0) {
      setErrorContentHeight(height)
    }
  }, [])

  const toggleError = useCallback(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: error ? errorContentHeight : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: error ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()
  }, [animatedHeight, animatedOpacity, error, errorContentHeight])

  useEffect(() => {
    toggleError()
  }, [error, toggleError])

  return (
    <View
      style={[
        styles.outerContainer,
        position === 'right' ? styles.positionRight : {},
        !adjacent && styles.apart,
        containerStyle,
      ]}>
      {children}

      <View
        style={[
          styles.textFieldsContainer,
          {borderColor: colors[getBorderColorName(status, isDark)]},
          position === 'right' || !adjacent ? styles.alignEndRightPosition : {},
          position === 'right' && !adjacent && styles.alignLeftRightPosition,
          position === 'left' ? styles.startMargin : styles.endMargin,
          // TODO: use different style
          containerStyle,
        ]}>
        {label ? (
          <SizedText
            size={size}
            style={[
              styles.label,
              disabled && {
                color: colors.text400,
              },
              labelStyle,
            ]}>
            {label}
          </SizedText>
        ) : null}

        {caption ? (
          <SizedText size={size} mode="caption" style={captionStyle}>
            {caption}
          </SizedText>
        ) : null}

        <Animated.View
          style={[
            {
              height: animatedHeight,
              opacity: animatedOpacity,
            },
            styles.row,
          ]}>
          <SizedText
            onLayout={onLayout}
            style={[
              styles.errorText,
              !adjacent && styles.alignRight,
              errorStyle,
            ]}
            size={size}
            status="error">
            {error}
          </SizedText>
        </Animated.View>
      </View>
    </View>
  )
}

export default BaseBooleanField

const styles = StyleSheet.create({
  alignLeftRightPosition: {
    alignItems: undefined,
  },
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textFieldsContainer: {
    paddingHorizontal: 2,
    flexShrink: 1, // this is important for text clipping for longer text of caption
  },
  alignEndRightPosition: {
    alignItems: 'flex-end',
  },
  positionRight: {
    flexDirection: 'row-reverse',
  },
  apart: {
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '500',
    flexShrink: 1,
  },
  startMargin: {
    marginStart: 8,
  },
  endMargin: {
    marginEnd: 8,
  },
  row: {
    flexDirection: 'row',
  },
  errorText: {
    position: 'absolute',
    // right: 0,
    // flexShrink: 1,
    // flex: 1,
    // flexGrow: 1,
  },
  alignRight: {
    right: 0,
  },
})
