import React, {useCallback, useMemo} from 'react'
import {Pressable, StyleSheet, ViewStyle} from 'react-native'

import {TypographyOptions, BlossomSize} from '../../common'
import {BaseButtonProps, PressableState} from '../types'
import Text from '../text/Text'
import {getStatusColorName} from '../utils'
import ActivityIndicator from '../loader/ActivityIndicator'
import {useBlossomTheme} from '../../context'
import {ColorHelper} from './helper'

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
    disabledStyle,
    disabledTitleStyle,
    onTextColorChange,
    onBackgroundColorChange,
    ...rest
  } = props

  const getButtonColor = useCallback(() => {
    const color = ColorHelper.getButtonColor({
      status,
      mode,
      disabled,
      colors,
      isDark,
    })
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
        disabled && disabledStyle,
        mode === 'outlined' ? styles.outlinedButton : {},
        styles.buttonContainer,
        sizeStyle[size],
        style,
      ]) as ViewStyle,
    [
      status,
      mode,
      disabled,
      colors,
      isDark,
      style,
      size,
      options?.borderRadius,
      disabledStyle,
      getButtonColor,
    ],
  )

  const getButtonStateColor = useCallback(
    (state: 'hovered' | 'pressed') => {
      const color = ColorHelper.getButtonStateColor({
        state,
        status,
        mode,
        backgroundColor: containerStyle?.backgroundColor,
        disabled,
        colors,
        isDark,
      })

      return color
    },
    [status, mode, containerStyle?.backgroundColor, disabled, colors, isDark],
  )

  const getTextColor = useCallback(() => {
    const color = ColorHelper.getTextColor({
      status,
      mode,
      backgroundColor: containerStyle?.backgroundColor,
      disabled,
      colors,
      isDark,
    })

    onTextColorChange?.(color)
    return color
  }, [
    status,
    mode,
    containerStyle?.backgroundColor,
    disabled,
    colors,
    isDark,
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
            disabled && disabledTitleStyle,
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
