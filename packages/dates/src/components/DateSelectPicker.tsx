import React, {useCallback, useState} from 'react'
import {
  Select,
  useBlossomTheme,
  useMergedProps,
  View,
} from '@react-native-blossom-ui/components'
import {StyleSheet} from 'react-native'
import {DateSelectPickerProps, MonthDayItem} from '../types'

import {getDaysListForMonth} from '../utils'
import YearPicker from './YearPicker'
import MonthPicker from './MonthPicker'

/**
 * Show a select picker for the months
 */
function DateSelectPicker(props: DateSelectPickerProps) {
  const {colors, isDark} = useBlossomTheme()

  const {monthProps, yearProps, onDateComplete} = useMergedProps(
    'DateSelectPicker',
    props,
    {
      colors,
      isDark,
    },
  )

  const [date, setDate] =
    useState<Omit<Partial<MonthDayItem>, 'isCurrentMonth'>>()

  const getDaysList = useCallback(() => {
    const days = getDaysListForMonth(
      date?.month || 0,
      date?.year || new Date().getFullYear(),
    )

    if (date && date?.day && !!date?.month?.toString() && date?.year) {
      onDateComplete?.({
        day: date.day,
        month: date.month,
        year: date.year,
      })
    }

    return days.map((value) => ({
      label: value.toString(),
      value,
    }))
  }, [date, onDateComplete])

  return (
    <View row style={styles.container}>
      <MonthPicker
        onItemPress={(month) => {
          setDate((prev) => ({
            ...prev,
            month,
          }))
        }}
        {...monthProps}
      />
      <Select
        placeholder="Date"
        options={getDaysList()}
        onValueChange={(day) => {
          setDate((prev) => ({
            ...prev,
            day,
          }))
        }}
      />
      <YearPicker
        {...yearProps}
        onItemPress={(year) => {
          setDate((prev) => ({
            ...prev,
            year,
          }))
        }}
      />
    </View>
  )
}

export default DateSelectPicker

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
})
