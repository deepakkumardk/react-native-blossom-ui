import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  LayoutChangeEvent,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
} from 'react-native'

import {TextInputProps} from '../types'

import {useBlossomTheme} from '../../context'
import {getBorderColorName} from '../utils'
import SizedText from '../text/SizedText'
import {View} from '../view'
import {useMergedProps} from '../../common'
import {textInputSizeStylesMap} from './styles'

/**
 * TextInput along with label,placeholder,caption & error support
 */
const TextInput = (props: TextInputProps, ref: React.Ref<RNTextInput>) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    label,
    placeholder,
    placeholderComponent,
    caption,
    error,
    labelStyle,
    captionStyle,
    errorStyle,
    disabled,
    shouldMockDisableState,
    mode = 'outlined',
    dense,
    left,
    right,
    containerStyle,
    inputContainerStyle,
    inputTextStyle,
    status,
    size = 'medium',
    ...rest
  } = useMergedProps('TextInput', props, {colors, isDark})

  const [isFocused, setIsFocused] = useState(false)

  const textInputSizeStyle = useMemo(() => textInputSizeStylesMap, [])

  const [errorContentHeight, setErrorContentHeight] = useState(0)
  const animatedHeight = useRef(new Animated.Value(0)).current
  const animatedOpacity = useRef(new Animated.Value(0)).current

  const memoizedInputContainerStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.innerContainer,
      left ? styles.leftPadding : {},
      right ? styles.rightPadding : {},
      mode === 'outlined'
        ? [
            styles.outlined,
            {
              borderRadius: options?.borderRadius,
            },
          ]
        : styles.flat,
      {
        backgroundColor: dense ? colors.backgroundTransparent300 : undefined,
        borderColor: disabled
          ? colors.background500
          : colors[
              getBorderColorName(
                error ? 'error' : status || (isFocused ? 'primary' : undefined),
                isDark,
              )
            ],
      },
      inputContainerStyle,
    ])
  }, [
    colors,
    dense,
    disabled,
    error,
    inputContainerStyle,
    isDark,
    isFocused,
    left,
    mode,
    options?.borderRadius,
    right,
    status,
  ])

  const memoizedInputTextStyle = useMemo(() => {
    return StyleSheet.flatten([
      mode === 'outlined' ? styles.outlinedInputText : styles.flatInputText,
      textInputSizeStyle[size].inputText,
      {
        color: disabled ? colors.text500 : colors.text100,
      },
      Platform.OS === 'web'
        ? {
            // Note: this style won't work in the stylesheet
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            outline: 'none',
          }
        : {},
      inputTextStyle,
    ])
  }, [
    colors.text100,
    colors.text500,
    disabled,
    inputTextStyle,
    mode,
    size,
    textInputSizeStyle,
  ])

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
    <View style={[styles.containerStyle, containerStyle]}>
      {label ? (
        <SizedText
          size={size}
          status={error ? 'error' : undefined}
          style={[
            !error && {
              color: disabled ? colors.text400 : colors.text100,
            },
            labelStyle,
          ]}>
          {label}
        </SizedText>
      ) : null}

      <View style={memoizedInputContainerStyle}>
        {left}
        {placeholderComponent}
        <RNTextInput
          ref={ref}
          placeholderTextColor={colors.text400}
          {...rest}
          placeholder={placeholderComponent ? '' : placeholder}
          editable={!(disabled || shouldMockDisableState)}
          focusable={!(disabled || shouldMockDisableState)}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          style={memoizedInputTextStyle}
          onFocus={(e) => {
            setIsFocused(true)
            rest?.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            rest?.onBlur?.(e)
          }}
        />
        {right}
      </View>

      {caption ? (
        <SizedText size={size} mode="caption" style={[captionStyle]}>
          {caption}
        </SizedText>
      ) : null}

      <Animated.View
        style={[{height: animatedHeight, opacity: animatedOpacity}]}>
        <SizedText
          style={[styles.errorText, errorStyle]}
          onLayout={onLayout}
          size={size}
          status="error">
          {error}
        </SizedText>
      </Animated.View>
    </View>
  )
}

export default forwardRef(TextInput)

const styles = StyleSheet.create({
  errorText: {
    position: 'absolute',
  },
  containerStyle: {
    minWidth: 100,
  },
  innerContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  leftPadding: {
    paddingLeft: 8,
  },
  rightPadding: {
    paddingRight: 8,
  },
  outlinedInputText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flatInputText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  outlined: {
    borderWidth: 1,
  },
  flat: {
    borderBottomWidth: 1,
  },
})
