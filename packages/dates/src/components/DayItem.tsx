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
    isDateDisabled,
    showAdjacentMonthDays,
    onItemPress,
    containerStyle,
    textStyle,
  } = props

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.5}
      disabled={
        isDateDisabled || (!showAdjacentMonthDays && !item.isCurrentMonth)
      }
      style={[styles.day, containerStyle]}
      onPress={() => onItemPress?.(item)}>
      {item.isCurrentMonth || showAdjacentMonthDays ? (
        <Text style={textStyle}>{item.day}</Text>
      ) : null}
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
})
