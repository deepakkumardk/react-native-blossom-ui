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
  TextInput as RNTextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import {View} from '../view'
import TextInput from './TextInput'
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
    ...rest
  } = useMergedProps('OtpInput', props, {colors, isDark})

  const [otp, setOtp] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<RNTextInput | null>(null)
  const cursorOpacity = useRef(new Animated.Value(0)).current

  const onInputChange = useCallback(
    (text: string) => {
      setOtp(text)
      if (text.length === maxLength) {
        onComplete?.(text)
      }
    },
    [maxLength, onComplete],
  )

  const getOtpInputText = useCallback(
    (value?: string, label?: string) => {
      if (value) {
        return rest?.secureTextEntry ? '*' : value
      }
      return label || ''
    },
    [rest?.secureTextEntry],
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

  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          accessibilityLabel="Text input field"
          containerStyle={styles.inputContainer}
          value={otp}
          onChangeText={onInputChange}
          maxLength={maxLength}
          keyboardType={withAlphanumericKeyboard ? 'default' : 'numeric'}
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          onFocus={(e) => {
            setIsFocused(true)
            rest?.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            rest?.onBlur?.(e)
          }}
          {...rest}
        />
        <View row style={[styles.boxRow]}>
          {Array(maxLength)
            .fill(rest?.placeholder || '')
            .map((label: string, index) => (
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
                        rest?.textStyle,
                      ],
                    ]}>
                    {otp.charAt(index) || label || ''}
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
  },
  inputContainer: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
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
})

const sizeMap: Record<BlossomSize, number> = {
  small: 36,
  medium: 40,
  large: 50,
}
