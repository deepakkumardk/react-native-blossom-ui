import React, {useCallback, useMemo} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {TypographyOptions, useBlossomTheme} from '../../context'
import {BlossomSize, ButtonProps} from '../types'
import Text from '../text/Text'
import {
  getFlatStyle,
  getPressedColor,
  getStatusColorName,
  getTextColorName,
} from '../utils'
import Loader from '../loader'

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
  } = props

  const {colors, isDark, options} = useBlossomTheme()

  const getButtonColor = useCallback(() => {
    if (disabled) return colors.bgDark100

    if (mode === 'filled') {
      return colors[getStatusColorName(status, isDark)]
    }
    return colors.background100
  }, [mode, disabled, status, colors, isDark])

  const containerStyle = useMemo(
    () => [
      {
        backgroundColor: getButtonColor(),
        borderColor: colors[getStatusColorName(status, isDark)],
        borderRadius: options?.borderRadius,
      },
      mode === 'outlined' ? styles.outlinedButton : {},
      styles.buttonContainer,
      sizeStyle[size],
      style,
    ],
    [
      colors,
      getButtonColor,
      isDark,
      mode,
      options?.borderRadius,
      size,
      status,
      style,
    ],
  )

  return (
    <Pressable
      {...rest}
      style={({pressed}) => [
        containerStyle,
        pressed && !isLoading && !disabled
          ? {
              backgroundColor: getPressedColor(
                mode === 'filled'
                  ? getFlatStyle(containerStyle)?.backgroundColor
                  : colors[getStatusColorName(status, isDark, '100')],
              ),
            }
          : {},
      ]}
      onPress={isLoading || disabled ? undefined : onPress}>
      <Loader visible={isLoading} size={16} {...loaderStyle} />
      {left}
      {children || text ? (
        <Text
          typography={sizeMap[size]}
          style={[
            {
              color:
                mode === 'filled'
                  ? colors[
                      getTextColorName(
                        getFlatStyle(containerStyle)?.backgroundColor,
                        isDark,
                      )
                    ]
                  : colors[getStatusColorName(status, isDark)],
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
    borderWidth: 1.5,
  },
})

const sizeStyle = {
  small: {
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  medium: {
    paddingHorizontal: 14, // 3 coming from below text style
    paddingVertical: 14,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
}

const sizeMap: Record<BlossomSize, TypographyOptions> = {
  small: 'l1',
  medium: 'b1',
  large: 's1',
}
