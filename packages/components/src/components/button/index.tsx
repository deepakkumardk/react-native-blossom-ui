import React, {useCallback} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {BlossomSize, ButtonProps, TypographyOptions} from '../types'
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

  const {colors, isDark} = useBlossomTheme()

  const getButtonColor = useCallback(() => {
    if (disabled) return colors.bgDark100

    if (mode === 'filled') {
      return colors[getStatusColorName(status, isDark)]
    }
    return colors.background100
  }, [mode, disabled, status, colors, isDark])

  const containerStyle = [
    {
      backgroundColor: getButtonColor(),
      borderColor: colors[getStatusColorName(status, isDark)],
    },
    mode === 'outlined' ? styles.outlinedButton : {},
    styles.buttonContainer,
    sizeStyle[size],
    style,
  ]

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
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 11, // 3 coming from below text style
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
    paddingHorizontal: 7,
    paddingVertical: 11,
  },
  medium: {
    paddingHorizontal: 11, // 3 coming from below text style
    paddingVertical: 14,
  },
  large: {
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
}

const sizeMap: Record<BlossomSize, TypographyOptions> = {
  small: 'l1',
  medium: 'b1',
  large: 's1',
}
