import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import {Spacer, View} from '../view'
import {OtpInputProps, OtpInputRef} from '../types'
import {BlossomSize, useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import SizedText from '../text/SizedText'
import {getStatusColorName} from '../utils'

/**
 * OTP/Pin input with custom style
 */
const OtpInput = (props: OtpInputProps, ref?: React.Ref<OtpInputRef>) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    maxLength = 4,
    boxStyle,
    mode = 'box',
    withAlphanumericKeyboard,
    withCursor,
    onComplete,
    status = 'primary',
    size = 'medium',
    disabled,
    label,
    labelStyle,
    caption,
    captionStyle,
    error,
    errorStyle,
    onChangeText,
    ...rest
  } = useMergedProps('OtpInput', props, {colors, isDark})

  const [otp, setOtp] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<RNTextInput | null>(null)
  const cursorOpacity = useRef(new Animated.Value(0)).current

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

  const onInputChange = useCallback(
    (text: string) => {
      let cleanText = text.replace(/[^0-9]/g, '')

      if (withAlphanumericKeyboard) {
        cleanText = text.replace(/[^a-zA-Z0-9]/g, '')
      }
      onChangeText?.(cleanText)
      setOtp(cleanText)
      if (cleanText.length === maxLength) {
        onComplete?.(cleanText)
      }
    },
    [maxLength, withAlphanumericKeyboard, onComplete, onChangeText],
  )

  useImperativeHandle(ref, () => {
    return {
      clear: () => {
        inputRef.current?.clear()
      },
    }
  }, [])

  const cursorLoop = useMemo(() => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0.5,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    )
  }, [cursorOpacity])

  useEffect(() => {
    if (withCursor && isFocused && otp.length !== maxLength) {
      cursorLoop.start()
    } else {
      cursorLoop.reset()
    }
  }, [cursorLoop, isFocused, maxLength, otp.length, withCursor])

  useEffect(() => {
    setOtp(rest?.value || '')
  }, [rest?.value])

  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
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
        <RNTextInput
          ref={inputRef}
          accessibilityLabel="OTP input field"
          style={styles.inputContainer}
          value={otp}
          maxLength={maxLength}
          keyboardType={withAlphanumericKeyboard ? 'default' : 'numeric'}
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          {...rest}
          onFocus={(e) => {
            setIsFocused(true)
            rest?.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            rest?.onBlur?.(e)
          }}
          onChangeText={onInputChange}
        />
        <View row style={[styles.boxRow]}>
          {Array(maxLength)
            .fill(rest?.placeholder || '')
            .map((fieldLabel: string, index) => (
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={[
                  mode === 'box' ? styles.box : styles.dash,
                  styles.boxRow,
                  {
                    width: sizeMap[size],
                    height: sizeMap[size],
                    borderColor:
                      otp.length === index && isFocused
                        ? colors[getStatusColorName(status)]
                        : colors.background800,
                  },
                  typeof boxStyle === 'function'
                    ? boxStyle?.(otp.length === index && isFocused)
                    : boxStyle,
                ]}>
                {rest?.secureTextEntry && otp.charAt(index) ? (
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: colors.background900,
                      },
                    ]}
                  />
                ) : (
                  <SizedText
                    mode="body"
                    style={[
                      [
                        {
                          color: otp.charAt(index)
                            ? colors.text100
                            : colors.text500,
                        },
                        rest?.inputTextStyle,
                      ],
                    ]}>
                    {otp.charAt(index) || fieldLabel || ''}
                  </SizedText>
                )}
                {otp.length === index && isFocused && !otp.charAt(index) && (
                  <Animated.View
                    style={[
                      styles.cursor,
                      {
                        opacity: cursorOpacity,
                        backgroundColor: colors.text100,
                      },
                    ]}
                  />
                )}
              </View>
            ))}
        </View>

        <Spacer height={2} />

        {caption ? (
          <SizedText size={size} mode="caption" style={[captionStyle]}>
            {caption}
          </SizedText>
        ) : null}

        <Spacer height={2} />

        <Animated.View
          style={[
            {
              height: animatedHeight,
              opacity: animatedOpacity,
              alignItems: 'center',
            },
          ]}>
          <SizedText
            style={[styles.errorText, errorStyle]}
            onLayout={onLayout}
            size={size}
            status="error">
            {error}
          </SizedText>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default forwardRef(OtpInput)

const DOT_SIZE = 10

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    position: 'absolute',
    width: 100,
    height: 40,
    opacity: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  boxRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
  },
  dash: {
    margin: 6,
    borderBottomWidth: 1,
  },
  dot: {
    borderRadius: DOT_SIZE,
    width: DOT_SIZE,
    height: DOT_SIZE,
  },
  cursor: {
    position: 'absolute',
    height: '50%',
    width: 1.25,
  },
  errorText: {
    position: 'absolute',
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 36,
  medium: 40,
  large: 50,
}
