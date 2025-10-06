import React, {useCallback, useMemo} from 'react'
import {FlatList, StyleSheet} from 'react-native'

import {Text, useBlossomTheme, View} from '@react-native-blossom-ui/components'

import {MonthDayItem, MonthDaysListProps} from '../types'
import {getAppendedDaysListForMonth, isAfter, isBefore} from '../utils'
import {WEEK_ARRAY} from './constants'
import DayItem from './DayItem'

/**
 * Show the days list in a current month and also append the adjacent months based on the props
 */
function MonthDaysList({
  selectedDate,
  currentMonth,
  currentYear,
  minDate,
  maxDate,
  outputDateFormat,
  disableDates,
  disableFutureDates,
  disablePastDates,
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

  const isDateDisabled = useCallback(
    (item: MonthDayItem) => {
      const today = new Date()

      if (disableFutureDates) {
        const isFutureDate =
          item.year > today.getFullYear() ||
          (item.year === today.getFullYear() &&
            item.month > today.getMonth()) ||
          (item.year === today.getFullYear() &&
            item.month === today.getMonth() &&
            item.day > today.getDate())

        if (isFutureDate) {
          return true
        }
      }

      if (disablePastDates) {
        const isPastDate =
          item.year < today.getFullYear() ||
          (item.year === today.getFullYear() &&
            item.month < today.getMonth()) ||
          (item.year === today.getFullYear() &&
            item.month === today.getMonth() &&
            item.day < today.getDate())

        if (isPastDate) {
          return true
        }
      }

      if (minDate) {
        const isBeforeMinDate = isBefore({
          dmy: item,
          minDate,
          outputDateFormat,
        })
        if (isBeforeMinDate) return true
      }

      if (maxDate) {
        const isAfterMaxDate = isAfter({
          dmy: item,
          maxDate,
          outputDateFormat,
        })
        if (isAfterMaxDate) return true
      }

      const doesContainDay = disableDates?.find((value) => {
        return (
          item.day === value?.day &&
          item.month === value?.month &&
          item.year === value?.year
        )
      })

      return !!doesContainDay
    },
    [
      disableDates,
      disableFutureDates,
      disablePastDates,
      maxDate,
      minDate,
      outputDateFormat,
    ],
  )

  const isToday = useCallback((item: MonthDayItem) => {
    const today = new Date()
    return (
      item.day === today.getDate() &&
      item.month === today.getMonth() &&
      item.year === today.getFullYear()
    )
  }, [])

  return (
    <FlatList
      data={daysList}
      numColumns={7}
      scrollEnabled={false}
      ListHeaderComponent={
        <View row>
          {WEEK_ARRAY.map((name) => (
            <View key={name} style={styles.day}>
              <Text
                typography="c2"
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
        <DayItem
          colors={colors}
          isDark={!!isDark}
          isDaySelected={isDaySelected(item)}
          isDateDisabled={isDateDisabled(item)}
          isToday={isToday(item)}
          item={item}
          onItemPress={onItemPress}
        />
      )}
    />
  )
}

export default MonthDaysList

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
