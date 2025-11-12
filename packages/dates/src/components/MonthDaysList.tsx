import React, {useCallback, useMemo} from 'react'
import {FlatList, StyleSheet} from 'react-native'

import {Text, useBlossomTheme, View} from '@react-native-blossom-ui/components'

import {MonthDayItem, MonthDaysListProps} from '../types'
import {
  getAppendedDaysListForMonth,
  isAfter,
  isBefore,
  isSameDate,
} from '../utils'
import {WEEK_ARRAY} from './constants'
import DayItem from './DayItem'

/**
 * Show the days list in a current month and also append the adjacent months based on the props
 */
function MonthDaysList({
  selectedDate,
  selectedDates,
  selectedEndDate,
  datePickerMode,
  currentMonth,
  currentYear,
  minDate,
  maxDate,
  outputDateFormat,
  disableDates,
  disabledDaysOfWeek,
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
      if (isSameDate(selectedDate, item)) return true

      if (selectedDates?.length) {
        for (let i = 0; i < selectedDates.length; i += 1) {
          if (isSameDate(selectedDates[i], item)) {
            return true
          }
        }
      }

      return false
    },
    [selectedDate, selectedDates],
  )

  const isBetweenRange = useCallback(
    (item: MonthDayItem) => {
      if (selectedDate && selectedEndDate) {
        const isBetween =
          isAfter({dmy: item, referenceDate: selectedDate, outputDateFormat}) &&
          isBefore({
            dmy: item,
            referenceDate: selectedEndDate,
            outputDateFormat,
          })

        return isBetween
      }

      return false
    },
    [outputDateFormat, selectedDate, selectedEndDate],
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
          referenceDate: minDate,
          outputDateFormat,
        })
        if (isBeforeMinDate) return true
      }

      if (maxDate) {
        const isAfterMaxDate = isAfter({
          dmy: item,
          referenceDate: maxDate,
          outputDateFormat,
        })
        if (isAfterMaxDate) return true
      }

      if (disabledDaysOfWeek?.length) {
        const isDisabledDay =
          item.weekDay?.toString() && disabledDaysOfWeek.includes(item.weekDay)
        if (isDisabledDay) return true
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
      disabledDaysOfWeek,
      maxDate,
      minDate,
      outputDateFormat,
    ],
  )

  const isToday = useCallback((item: MonthDayItem) => {
    const today = new Date()
    return isSameDate(today, item)
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
          item={item}
          isDateDisabled={isDateDisabled(item)}
          onItemPress={onItemPress}
          containerStyle={[
            isToday(item) && {
              ...styles.today,
              borderColor: colors.primary500,
            },
            isDaySelected(item) && {
              backgroundColor: colors.primary500,
            },
            isBetweenRange(item) && {
              borderRadius: 0,
              backgroundColor: colors.background400,
            },
            datePickerMode === 'range' &&
              isDaySelected(item) && {
                ...styles.startRangeDate,
                backgroundColor: colors.primary500,
              },
            isSameDate(selectedEndDate, item) && {
              ...styles.endRangeDate,
              backgroundColor: colors.primary500,
            },
          ]}
          textStyle={[
            !item.isCurrentMonth && {
              color: colors.text400,
            },
            isDaySelected(item) && {
              color: isDark ? colors.text100 : colors.text900,
            },
            isDateDisabled(item) && {
              color: colors.text600,
            },
          ]}
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
  today: {
    borderWidth: 1,
  },
  startRangeDate: {
    borderRadius: 0,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  endRangeDate: {
    borderRadius: 0,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
})
