import React from 'react'
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native'

import {Text, useBlossomTheme} from '@react-native-blossom-ui/components'

import {MonthNamesListProps} from '../types'
import {MONTHS_ARRAY} from './constants'

/**
 * Show the list of month names in a flat list
 */
function MonthNamesList({currentMonth, onItemPress}: MonthNamesListProps) {
  const {colors} = useBlossomTheme()

  return (
    <FlatList
      data={MONTHS_ARRAY}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={styles.listContent}
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
  listContent: {
    marginStart: 4,
  },
  day: {
    width: 100,
    height: 24,
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 10,
    justifyContent: 'center',
  },
})
