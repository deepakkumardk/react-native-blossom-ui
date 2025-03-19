import React, {memo} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Text} from '@react-native-blossom-ui/components'
import {DayItemProps} from '../types'

/**
 * DayItem for the Calendar days list
 * Render the given day of the month with today,selected & disabled styling
 */
function DayItem(props: DayItemProps) {
  const {
    item,
    isDaySelected,
    isToday,
    isDateDisabled,
    onItemPress,
    colors,
    isDark,
  } = props

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.5}
      disabled={isDateDisabled}
      style={[
        styles.day,
        isDaySelected && {
          backgroundColor: colors.primary500,
        },
        isToday && {
          ...styles.today,
          borderColor: colors.primary500,
        },
      ]}
      onPress={() => onItemPress?.(item)}>
      <Text
        style={[
          !item.isCurrentMonth && {
            color: colors.text400,
          },
          isDaySelected && {
            color: isDark ? colors.text100 : colors.text900,
          },
          isDateDisabled && {
            color: colors.text600,
          },
        ]}>
        {item.day}
      </Text>
    </TouchableOpacity>
  )
}

export default memo(DayItem)

const styles = StyleSheet.create({
  day: {
    width: 40,
    height: 40,
    margin: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: {
    borderWidth: 1,
  },
})
