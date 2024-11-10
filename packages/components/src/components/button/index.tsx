import React, {useCallback, useMemo} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {TypographyOptions, useBlossomTheme} from '../../context'
import {BlossomSize, ButtonMode, ButtonProps} from '../types'
import Text from '../text/Text'
import {
  getAlphaColor,
  getDarkenColor,
  getFlatStyle,
  getStatusColorName,
  getTextColorName,
} from '../utils'
import ActivityIndicator from '../loader'
import {useMergedProps} from '../../common'

/**
 * Standard Button component with multiple customizations
 */
const Button = (props: ButtonProps) => {
  const {
    text,
    style,
    textStyle,
    isLoading = false,
    disabled,
    children,
    status = 'primary',
    mode = 'filled',
    size = 'medium',
    left,
    right,
    onPress,
    loaderStyle,
    ...rest
  } = useMergedProps('Button', props)

  const {colors, isDark, options} = useBlossomTheme()

  const getButtonColor = useCallback(() => {
    const modeColorMap: Record<
      ButtonMode,
      {
        true: string
        false: string
      }
    > = {
      filled: {
        true: colors.background300,
        false: colors[getStatusColorName(status, isDark)],
      },
      tinted: {
        true: colors.background200,
        false: colors[getStatusColorName(status, isDark, '200')],
      },
      outlined: {
        true: colors.background100,
        false: colors.background100,
      },
      plain: {
        true: colors.background100,
        false: colors.background100,
      },
    }

    return modeColorMap[mode][disabled ? 'true' : 'false']
  }, [mode, disabled, status, colors, isDark])

  const containerStyle = useMemo(
    () => [
      {
        backgroundColor: getButtonColor(),
        borderColor: disabled
          ? colors.background400
          : colors[getStatusColorName(status, isDark, '300')],
        borderRadius: options?.borderRadius,
      },
      mode === 'outlined' ? styles.outlinedButton : {},
      styles.buttonContainer,
      sizeStyle[size],
      style,
    ],
    [
      colors,
      disabled,
      getButtonColor,
      isDark,
      mode,
      options?.borderRadius,
      size,
      status,
      style,
    ],
  )

  const getPressedColor = useCallback(() => {
    const bgColor = getFlatStyle(containerStyle)?.backgroundColor
    const buttonColor = getButtonColor()

    let color = colors[`${status}700`]

    if (mode === 'filled') {
      color = colors[`${status}700`]
    } else if (mode === 'tinted') {
      color = colors[`${status}100`]
    } else {
      color = colors[`${status}${isDark ? '200' : '100'}`]
    }

    if (bgColor !== buttonColor) {
      if (mode === 'filled') {
        color = getDarkenColor(bgColor as string, 0.8)
      } else {
        color = getAlphaColor(bgColor as string, 0.5)
      }
    }

    return color
  }, [colors, containerStyle, getButtonColor, isDark, mode, status])

  const getTextColor = useCallback(() => {
    return disabled || mode === 'filled'
      ? colors[
          getTextColorName(
            getFlatStyle(containerStyle)?.backgroundColor,
            isDark,
            disabled,
            mode,
          )
        ]
      : colors[getStatusColorName(status, isDark)]
  }, [colors, containerStyle, disabled, isDark, mode, status])

  return (
    <Pressable
      {...rest}
      style={({pressed}) => [
        containerStyle,
        pressed && !isLoading && !disabled
          ? {
              backgroundColor: getPressedColor(),
            }
          : {},
      ]}
      onPress={isLoading || disabled ? undefined : onPress}>
      <ActivityIndicator
        visible={isLoading}
        size={16}
        style={styles.loader}
        color={getTextColor()}
        {...loaderStyle}
      />
      {left}
      {children || text ? (
        <Text
          typography={sizeMap[size]}
          style={[
            {
              color: getTextColor(),
            },
            styles.text,
            textStyle,
          ]}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {children || text}
        </Text>
      ) : null}
      {right}
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    paddingHorizontal: 6,
  },
  outlinedButton: {
    borderWidth: 1,
  },
  loader: {
    paddingHorizontal: 4,
  },
})

const sizeStyle = {
  small: {
    paddingHorizontal: 9,
    paddingVertical: 10,
  },
  medium: {
    paddingHorizontal: 13, // 3 coming from below text style
    paddingVertical: 14,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
}

const sizeMap: Record<BlossomSize, TypographyOptions> = {
  small: 'l1',
  medium: 'b1',
  large: 's1',
}
