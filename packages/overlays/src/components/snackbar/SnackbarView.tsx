import React, {useCallback} from 'react'
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native'

import {
  View,
  Text,
  useMergedProps,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'
import {SnackbarViewProps} from './types'

function SnackbarView(props: SnackbarViewProps) {
  const {colors, isDark} = useBlossomTheme()

  const {width: screenWidth} = useWindowDimensions()

  const {
    text,
    actionText,
    textStyle,
    actionTextStyle,
    onActionPress,
    numberOfLines = 2,
    theme = 'dark',
    containerStyle,
  } = useMergedProps('SnackbarView', props, {
    colors,
    isDark,
  })

  const getBackgroundColor = useCallback(() => {
    const themeColorMap: Record<typeof theme, string> = {
      light: colors.bgLight100,
      dark: colors.bgDark800,
      auto: isDark ? colors.bgDark800 : colors.bgLight100,
    }

    return themeColorMap[theme]
  }, [colors.bgLight100, colors.bgDark800, isDark, theme])

  const getTextColor = useCallback(() => {
    const themeColorMap: Record<typeof theme, string> = {
      light: colors.bgDark800,
      dark: colors.bgLight100,
      auto: isDark ? colors.bgLight100 : colors.bgDark800,
    }

    return themeColorMap[theme]
  }, [colors.bgLight100, colors.bgDark800, isDark, theme])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          width: screenWidth - 32,
        },
        containerStyle,
      ]}>
      <Text
        typography="s3"
        style={[styles.textStyle, {color: getTextColor()}, textStyle]}
        numberOfLines={numberOfLines}>
        {text}
      </Text>

      {actionText && (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.7}
          onPress={onActionPress}>
          <Text
            typography="b1"
            style={[{color: getTextColor()}, actionTextStyle]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SnackbarView

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
  },
})
