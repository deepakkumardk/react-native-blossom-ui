import React from 'react'
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
    containerStyle,
  } = useMergedProps('SnackbarView', props, {
    colors,
    isDark,
  })

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgDark800,
          width: screenWidth - 32,
        },
        containerStyle,
      ]}>
      <Text
        typography="s3"
        style={[styles.textStyle, textStyle]}
        numberOfLines={numberOfLines}>
        {text}
      </Text>

      {actionText && (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.7}
          onPress={onActionPress}>
          <Text typography="b1" style={actionTextStyle}>
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
