import React, {forwardRef, useMemo, useState} from 'react'
import {Platform, TextInput as RNTextInput, StyleSheet} from 'react-native'

import {TextInputProps} from '../types'

import {useBlossomTheme} from '../../context'
import {getBorderColorName} from '../utils'
import SizedText from '../text/SizedText'
import {View} from '../view'
import {useMergedProps} from '../../common'

/**
 * TextInput along with label,placeholder,caption & error support
 */
const TextInput = (props: TextInputProps, ref: React.Ref<RNTextInput>) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    label,
    placeholder,
    caption,
    error,
    labelStyle,
    placeholderStyle,
    captionStyle,
    errorStyle,
    disabled,
    shouldMockDisableState,
    mode = 'outlined',
    dense,
    left,
    right,
    containerStyle,
    inputStyle,
    textStyle,
    status,
    size = 'medium',
    ...rest
  } = useMergedProps('TextInput', props, {colors, isDark})

  const [isFocused, setIsFocused] = useState(false)

  const textInputSizeStyle = useMemo(() => textInputSizeStylesMap, [])

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
            backgroundColor: dense
              ? colors.backgroundTransparent300
              : undefined,
            borderColor: disabled
              ? colors.background500
              : colors[
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
          placeholderTextColor={colors.text400}
          {...rest}
          placeholder={placeholder}
          editable={!(disabled || shouldMockDisableState)}
          focusable={!(disabled || shouldMockDisableState)}
          style={[
            styles.inputText,
            textInputSizeStyle[size].inputText,
            {
              color: disabled ? colors.text500 : colors.text100,
            },
            left ? styles.leftMargin : {},
            textStyle,
            Platform.OS === 'web' && {
              // Note: this style won't work in the stylesheet
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              outline: 'none',
            },
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
  containerStyle: {
    minWidth: 100,
  },
  innerContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingTop: 4,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
})

const textInputSizeStylesMap = {
  small: {
    outlined: {
      padding: 6,
    },
    inputText: {
      fontSize: 14,
    },
  },
  medium: {
    outlined: {
      padding: 9,
    },
    inputText: {
      fontSize: 16,
    },
  },
  large: {
    outlined: {
      padding: 12,
    },
    inputText: {
      fontSize: 17,
    },
  },
}
