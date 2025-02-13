import React, {useCallback, useMemo} from 'react'
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native'

import {Text, useBlossomTheme, View} from '@react-native-blossom-ui/components'
import {MonthDayItem, MonthDaysListProps} from '../types'
import {getAppendedDaysListForMonth} from '../utils'

const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * Show the days list in a current month and also append the adjacent months based on the props
 */
function MonthDaysList({
  selectedDate,
  currentMonth,
  currentYear,
  onItemPress,
}: MonthDaysListProps) {
  const {colors, isDark} = useBlossomTheme()

  const daysList = useMemo(() => {
    return getAppendedDaysListForMonth(currentMonth, currentYear)
  }, [currentMonth, currentYear])

  const isDaySelected = useCallback(
    (item: MonthDayItem) => {
      if (
        item.day === selectedDate?.getDate() &&
        item.month === selectedDate?.getMonth() &&
        item.year === selectedDate?.getFullYear()
      )
        return true
      return false
    },
    [selectedDate],
  )

  const isToday = useCallback(
    (day: number) => {
      const today = new Date()
      if (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      ) {
        return true
      }
      return false
    },
    [currentMonth, currentYear],
  )

  return (
    <FlatList
      data={daysList}
      numColumns={7}
      scrollEnabled={false}
      ListHeaderComponent={
        <View row>
          {weekArray.map((name) => (
            <View key={name} style={styles.day}>
              <Text
                typography="c1"
                style={{
                  color: colors.text300,
                }}>
                {name}
              </Text>
            </View>
          ))}
        </View>
      }
      renderItem={({item}) => (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.5}
          style={[
            styles.day,
            isDaySelected(item) && {
              backgroundColor: colors.primary500,
            },
            isToday(item.day) && {
              borderWidth: 1,
              borderColor: colors.primary500,
            },
          ]}
          onPress={() => onItemPress?.(item)}>
          <Text
            style={[
              !item.isCurrentMonth && {
                color: colors.text400,
              },
              isDaySelected(item) && {
                color: isDark ? colors.text100 : colors.text900,
              },
            ]}>
            {item.day}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default MonthDaysList

const styles = StyleSheet.create({
  day: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
