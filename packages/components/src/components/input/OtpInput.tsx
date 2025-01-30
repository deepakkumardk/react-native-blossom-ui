import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
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
    onComplete,
    status = 'primary',
    size = 'medium',
    ...rest
  } = useMergedProps('OtpInput', props, {colors, isDark})

  const [otp, setOtp] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<RNTextInput | null>(null)

  const onInputChange = useCallback(
    (text: string) => {
      setOtp(text)
      if (text.length === maxLength) {
        onComplete?.(text)
      }
    },
    [maxLength, onComplete],
  )

  useImperativeHandle(ref, () => {
    return {
      clear: () => {
        inputRef.current?.clear()
      },
    }
  }, [])

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
            .map((label, index) => (
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
                        : colors.background900,
                  },
                  typeof boxStyle === 'function'
                    ? boxStyle?.(otp.length === index && isFocused)
                    : boxStyle,
                ]}>
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
              </View>
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default forwardRef(OtpInput)

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
})

const sizeMap: Record<BlossomSize, number> = {
  small: 36,
  medium: 40,
  large: 50,
}
