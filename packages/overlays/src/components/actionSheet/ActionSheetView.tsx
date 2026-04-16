import React from 'react'
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native'

import {
  View,
  Text,
  useMergedProps,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'
import {ActionSheetViewProps} from './types'

const HORIZONTAL_PADDING = 16

function ActionSheetView(props: ActionSheetViewProps) {
  const {colors, isDark} = useBlossomTheme()

  const {width: screenWidth} = useWindowDimensions()

  const {
    title,
    titleStyle,
    message,
    messageStyle,
    options,
    withCancelButton,
    onItemPress,
    itemStyle,
    cancelButtonLabel = 'Cancel',
    cancelButtonTextStyle,
    containerStyle,
  } = useMergedProps('ActionSheetView', props, {
    colors,
    isDark,
  })

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          isDark ? styles.containerDark : styles.containerLight,
          {
            width: screenWidth - HORIZONTAL_PADDING,
          },
          containerStyle,
        ]}>
        {title ? (
          <Text typography="h6" style={[styles.textStyle, titleStyle]}>
            {title}
          </Text>
        ) : null}

        {message ? (
          <Text typography="l3" style={[styles.textStyle, messageStyle]}>
            {message}
          </Text>
        ) : null}

        {title || message ? (
          <View
            style={[
              styles.divider,
              isDark ? styles.itemDividerDark : styles.itemDividerLight,
            ]}
          />
        ) : null}

        {options?.map((item, index) => (
          <View key={item.key}>
            <TouchableOpacity
              accessibilityRole="button"
              disabled={item.disabled}
              activeOpacity={0.7}
              style={[styles.item, itemStyle]}
              onPress={() => {
                onItemPress?.(item.key, index)
              }}>
              {item.icon}
              <Text
                typography="s2"
                style={[
                  item.destructive && {color: colors.error500},
                  item.labelStyle,
                ]}
                numberOfLines={2}>
                {item.label}
              </Text>
            </TouchableOpacity>
            {index !== options.length - 1 && (
              <View
                style={
                  isDark ? styles.itemDividerDark : styles.itemDividerLight
                }
              />
            )}
          </View>
        ))}
      </View>

      {withCancelButton && (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.7}
          style={[
            styles.item,
            styles.cancelButton,
            {
              backgroundColor: isDark
                ? colors.background100
                : colors.bgLight100,
            },
          ]}
          onPress={() => {
            onItemPress?.('cancel', options.length)
          }}>
          <Text
            typography="s1"
            style={[styles.cancelTextStyle, cancelButtonTextStyle]}>
            {cancelButtonLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ActionSheetView

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 24,
  },
  containerLight: {
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
  },
  containerDark: {
    borderRadius: 14,
    backgroundColor: '#1C1C1E',
  },
  itemTextStyle: {
    fontWeight: 'bold',
  },
  cancelTextStyle: {
    fontWeight: '500',
  },
  textStyle: {
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cancelButton: {
    marginTop: 12,
    borderRadius: 16,
  },
  divider: {
    marginTop: 16,
  },
  itemDividerLight: {
    backgroundColor: 'rgba(60,60,67,0.29)',
    height: 1,
  },
  itemDividerDark: {
    backgroundColor: 'rgba(84,84,88,0.65)',
    height: 1,
  },
})
