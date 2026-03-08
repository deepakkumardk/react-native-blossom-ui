import React from 'react'
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native'

import {
  View,
  Text,
  useMergedProps,
  useBlossomTheme,
  Divider,
} from '@react-native-blossom-ui/components'
import {ActionSheetViewProps} from './types'

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
    <View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? colors.bgDark900 : colors.bgLight100,
            width: screenWidth - 16,
          },
          containerStyle,
        ]}>
        {title ? (
          <Text typography="h6" style={[styles.titleStyle, titleStyle]}>
            {title}
          </Text>
        ) : null}

        {message ? (
          <Text typography="s2" style={[styles.messageStyle, messageStyle]}>
            {message}
          </Text>
        ) : null}

        {title || message ? (
          <Divider height={1} style={styles.divider} />
        ) : null}

        {options?.map((option, index) => (
          <View key={option.key}>
            <TouchableOpacity
              accessibilityRole="button"
              disabled={option.disabled}
              activeOpacity={0.7}
              style={[styles.item, itemStyle]}
              onPress={() => {
                onItemPress?.(option.key, index)
              }}>
              {option.icon}
              <Text
                typography="s2"
                style={[
                  option.destructive && {color: colors.error500},
                  option.textStyle,
                ]}
                numberOfLines={2}>
                {option.label}
              </Text>
            </TouchableOpacity>
            <Divider height={1} />
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
            {backgroundColor: colors.background100},
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
  container: {
    // gap: 16,
    // padding: 16,
    borderRadius: 16,
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  itemTextStyle: {
    // flex: 1,
    fontWeight: 'bold',
  },
  cancelTextStyle: {
    // flex: 1,
    fontWeight: '500',
  },
  titleStyle: {
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  messageStyle: {
    textAlign: 'center',
    paddingTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    // gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cancelButton: {
    marginTop: 8,
    borderRadius: 16,
  },
  divider: {
    marginTop: 16,
  },
})
