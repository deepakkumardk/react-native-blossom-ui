import React, {forwardRef, useState} from 'react'
import {TextInput as RNTextInput, StyleSheet} from 'react-native'

import {TextInputProps} from '../types'

import {useBlossomTheme} from '../../context'
import {getBorderColorName} from '../utils'
import SizedText from '../text/SizedText'
import View from '../view'
import {useMergedProps} from '../../common'

const TextInput = (props: TextInputProps, ref: React.Ref<RNTextInput>) => {
  const {
    label,
    placeholder,
    caption,
    error = '',
    labelStyle,
    placeholderStyle,
    captionStyle,
    errorStyle,
    disabled,
    mode = 'outlined',
    left,
    right,
    containerStyle,
    inputStyle,
    textStyle,
    status,
    size = 'medium',
    ...rest
  } = useMergedProps('TextInput', props)

  const {colors, isDark, options} = useBlossomTheme()

  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={[containerStyle]}>
      {label ? (
        <SizedText
          size={size}
          status={error ? 'error' : undefined}
          style={[{color: colors.background800}, labelStyle]}>
          {label}
        </SizedText>
      ) : null}
      <View
        style={[
          styles.innerContainer,
          mode === 'outlined'
            ? [
                styles.outlined,
                textInputSizeStyle[size].outlined,
                {
                  borderRadius: options?.borderRadius,
                },
              ]
            : styles.flat,
          {
            borderColor:
              colors[
                getBorderColorName(
                  error
                    ? 'error'
                    : status || (isFocused ? 'primary' : undefined),
                  isDark,
                )
              ],
          },
          inputStyle,
        ]}>
        {left}
        <RNTextInput
          ref={ref}
          {...rest}
          placeholder={placeholder}
          placeholderTextColor={colors.background600}
          editable={!disabled}
          style={[
            styles.inputText,
            textInputSizeStyle[size].inputText,
            {
              color: colors.background1100,
            },
            left ? styles.leftMargin : {},
            textStyle,
          ]}
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
      {error ? (
        <SizedText size={size} status="error" style={[errorStyle]}>
          {error}
        </SizedText>
      ) : null}
    </View>
  )
}

export default forwardRef(TextInput)

const styles = StyleSheet.create({
  innerContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftMargin: {
    marginHorizontal: 6,
  },
  inputText: {
    flex: 1,
    marginHorizontal: 2,
  },
  outlined: {
    borderWidth: 1,
  },
  flat: {
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
})

const textInputSizeStyle = {
  small: {
    outlined: {
      padding: 8,
    },
    inputText: {
      fontSize: 14,
    },
  },
  medium: {
    outlined: {
      padding: 12,
    },
    inputText: {
      fontSize: 16,
    },
  },
  large: {
    outlined: {
      padding: 16,
    },
    inputText: {
      fontSize: 17,
    },
  },
}
