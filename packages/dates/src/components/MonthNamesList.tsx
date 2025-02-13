import React from 'react'
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native'

import {Text, useBlossomTheme} from '@react-native-blossom-ui/components'
import {MonthNamesListProps} from '../types'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Show the list of month names in a flat list
 */
function MonthNamesList({currentMonth, onItemPress}: MonthNamesListProps) {
  const {colors} = useBlossomTheme()

  return (
    <FlatList
      data={MONTHS}
      numColumns={3}
      scrollEnabled={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.5}
          style={[styles.day]}
          onPress={() => onItemPress?.(index)}>
          <Text
            style={[
              currentMonth === index && {
                color: colors.primary500,
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default MonthNamesList

const styles = StyleSheet.create({
  day: {
    width: 100,
    height: 24,
    margin: 4,
    borderRadius: 10,
    justifyContent: 'center',
  },
})
