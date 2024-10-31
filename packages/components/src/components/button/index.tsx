import React, {useCallback} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {ButtonProps} from '../types'
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
    style,
  ]

  return (
    <Pressable
      {...rest}
      style={({pressed}) => [
        containerStyle,
        pressed
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
          typography="b1"
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
    paddingHorizontal: 16,
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
