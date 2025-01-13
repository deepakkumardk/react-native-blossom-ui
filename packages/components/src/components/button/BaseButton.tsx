import React, {useCallback, useMemo} from 'react'
import {Pressable, StyleSheet, ViewStyle} from 'react-native'

import {BlossomThemeColors, TypographyOptions, BlossomSize} from '../../common'
import {BaseButtonProps, ButtonMode, PressableState} from '../types'
import Text from '../text/Text'
import {
  getDarkenColor,
  getStatusColorName,
  getTextColorName,
  getTransparentStatusColorName,
} from '../utils'
import ActivityIndicator from '../loader/ActivityIndicator'
import {useBlossomTheme} from '../../context'

/**
 * It's the Base Button view that will be consumed by Button, Chip & SegmentedButton
 */
const BaseButton = (props: BaseButtonProps) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    title,
    style,
    titleStyle,
    isLoading = false,
    disabled,
    children,
    status = 'primary',
    mode = 'filled',
    size = 'medium',
    left,
    right,
    onPress,
    loaderProps,
    onTextColorChange,
    onBackgroundColorChange,
    ...rest
  } = props

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
        false:
          colors[getTransparentStatusColorName(status, isDark ? '200' : '100')],
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

    const color = modeColorMap[mode][disabled ? 'true' : 'false']
    onBackgroundColorChange?.(color)
    return color
  }, [colors, status, isDark, mode, disabled, onBackgroundColorChange])

  const containerStyle = useMemo(
    () =>
      StyleSheet.flatten([
        {
          backgroundColor: getButtonColor(),
          borderColor: disabled
            ? colors.background400
            : colors[getStatusColorName(status, isDark, '500')],
          borderRadius: options?.borderRadius,
        },
        mode === 'outlined' ? styles.outlinedButton : {},
        styles.buttonContainer,
        sizeStyle[size],
        style,
      ]) as ViewStyle,
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

  const getButtonStateColor = useCallback(
    (state: 'hovered' | 'pressed') => {
      const bgColor = containerStyle?.backgroundColor
      const buttonColor = getButtonColor()

      const hoverColorMap: Record<ButtonMode, keyof BlossomThemeColors> = {
        filled: `${status}600`,
        tinted: `${status}Transparent${isDark ? '300' : '200'}`,
        outlined: `${status}Transparent${isDark ? '200' : '100'}`,
        plain: `${status}Transparent${isDark ? '200' : '100'}`,
      }

      const pressColorMap: Record<ButtonMode, keyof BlossomThemeColors> = {
        filled: `${status}700`,
        tinted: `${status}Transparent${isDark ? '400' : '300'}`,
        outlined: `${status}Transparent${isDark ? '300' : '200'}`,
        plain: `${status}Transparent${isDark ? '300' : '200'}`,
      }

      let color =
        colors[state === 'pressed' ? pressColorMap[mode] : hoverColorMap[mode]]

      if (bgColor !== buttonColor) {
        const alphaColorMap: Record<typeof state, number> = {
          hovered: mode === 'filled' ? 0.6 : 0.4,
          pressed: mode === 'filled' ? 0.8 : 0.5,
        }
        color = getDarkenColor(bgColor as string, alphaColorMap[state])
      }

      return color
    },
    [colors, containerStyle, getButtonColor, isDark, mode, status],
  )

  const getTextColor = useCallback(() => {
    const color =
      disabled || mode === 'filled'
        ? colors[
            getTextColorName(
              containerStyle?.backgroundColor,
              isDark,
              disabled,
              mode,
            )
          ]
        : colors[getStatusColorName(status, isDark)]

    onTextColorChange?.(color)
    return color
  }, [
    colors,
    containerStyle?.backgroundColor,
    disabled,
    isDark,
    mode,
    status,
    onTextColorChange,
  ])

  return (
    <Pressable
      {...rest}
      style={({pressed, hovered, focused}: PressableState) => {
        return [
          containerStyle,
          (pressed || hovered) &&
            !isLoading &&
            !disabled && {
              backgroundColor: getButtonStateColor(
                pressed ? 'pressed' : 'hovered',
              ),
            },
        ]
      }}
      onPress={isLoading || disabled ? undefined : onPress}>
      <ActivityIndicator
        visible={isLoading}
        size={16}
        style={styles.loader}
        color={getTextColor()}
        {...loaderProps}
      />
      {left}
      {children || title ? (
        <Text
          typography={sizeMap[size]}
          style={[
            {
              color: getTextColor(),
            },
            styles.text,
            titleStyle,
          ]}
          selectable={false}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {children || title}
        </Text>
      ) : null}
      {right}
    </Pressable>
  )
}

export default BaseButton

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
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  medium: {
    paddingHorizontal: 13, // 3 coming from text style
    paddingVertical: 12,
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
