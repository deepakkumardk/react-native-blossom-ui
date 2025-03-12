import React, {useCallback, useState} from 'react'
import {
  Select,
  Spacer,
  useBlossomTheme,
  useMergedProps,
  View,
} from '@react-native-blossom-ui/components'

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
    <View row>
      <MonthPicker
        onItemPress={(month) => {
          setDate((prev) => ({
            ...prev,
            month,
          }))
        }}
        {...monthProps}
      />
      <Spacer width={10} />
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
      <Spacer width={10} />
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
