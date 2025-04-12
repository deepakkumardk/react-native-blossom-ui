import React, {memo, useCallback, useMemo, useRef, useState} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {
  Icon,
  Text,
  useBlossomTheme,
  View,
} from '@react-native-blossom-ui/components'

import {CalendarProps, MonthDayItem, YearsListRef} from '../types'
import {
  convertToDayjs,
  getDateWithDMY,
  getFormattedDate,
  toDate,
} from '../utils'
import MonthDaysList from './MonthDaysList'
import MonthNamesList from './MonthNamesList'
import YearList from './YearList'
import {DEFAULT_DISPLAY_FORMAT, DEFAULT_OUTPUT_FORMAT} from './constants'

/**
 * Display the calendar days of the month with current month-year text
 */
function Calendar(props: CalendarProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    selectedDate: date,
    displayDateFormat = DEFAULT_DISPLAY_FORMAT,
    outputDateFormat = DEFAULT_OUTPUT_FORMAT,
    disableDates,
    yearListProps,
    onDateChange,
  } = props

  const today = useRef(new Date()).current

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date instanceof Date ? date : toDate(date, displayDateFormat),
  )

  const [currentMonth, setCurrentMonth] = useState(
    (selectedDate || today)?.getMonth(),
  )
  const [currentYear, setCurrentYear] = useState(
    (selectedDate || today)?.getFullYear(),
  )
  const [viewMode, setViewMode] = useState<'Days' | 'Month' | 'Year'>('Days')

  const yearsRef = useRef<YearsListRef>(null)

  const onMonthHeaderPress = useCallback(() => {
    setViewMode((prev) => {
      return prev === 'Month' ? 'Days' : 'Month'
    })
  }, [])

  const onYearHeaderPress = useCallback(() => {
    setViewMode((prev) => {
      return prev === 'Year' ? 'Days' : 'Year'
    })
  }, [])

  const onPrevPress = useCallback(() => {
    if (viewMode === 'Month') return

    if (viewMode === 'Year') {
      if (yearsRef.current?.hasMinYear()) return

      yearsRef.current?.loadPrevYears()
      return
    }

    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((prevYear) => prevYear - 1)
        return 11
      }
      return prev - 1
    })
  }, [viewMode])

  const onNextPress = useCallback(() => {
    if (viewMode === 'Month') return

    if (viewMode === 'Year') {
      if (yearsRef.current?.hasMaxYear()) return

      yearsRef.current?.loadNextYears()
      return
    }

    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((prevYear) => prevYear + 1)
        return 0
      }
      return prev + 1
    })
  }, [viewMode])

  const onTodayPress = useCallback(() => {
    if (viewMode === 'Month') return

    const todayDate = new Date()
    setCurrentMonth(todayDate.getMonth())
    setCurrentYear(todayDate.getFullYear())
  }, [viewMode])

  const onDatePress = useCallback(
    (item: MonthDayItem) => {
      const newDate = getDateWithDMY(item.day, item.month, item.year)
      setSelectedDate(newDate)
      onDateChange?.(
        newDate,
        getFormattedDate(newDate, displayDateFormat),
        getFormattedDate(newDate, outputDateFormat),
      )
    },
    [displayDateFormat, outputDateFormat, onDateChange],
  )

  const onMonthPress = useCallback((month: number) => {
    setCurrentMonth(month)
    setViewMode('Days')
  }, [])

  const onYearPress = useCallback((year: number) => {
    setCurrentYear(year)
    setViewMode('Days')
  }, [])

  const transformedDisabledDates = useMemo(() => {
    return disableDates?.map((value) => {
      const dateValue = convertToDayjs(value, outputDateFormat)
      const dayItem: MonthDayItem = {
        day: dateValue.date(),
        month: dateValue.month(),
        year: dateValue.year(),
      }
      return dayItem
    })
  }, [disableDates, outputDateFormat])

  const formattedMonth = useMemo(() => {
    return getFormattedDate(
      getDateWithDMY(1, currentMonth, currentYear),
      'MMMM',
    )
  }, [currentMonth, currentYear])

  return (
    <View>
      <View row style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.5}
          onPress={onMonthHeaderPress}>
          <Text>
            {formattedMonth}
            <Icon name="chevron-down" size={16} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.5}
          onPress={onYearHeaderPress}>
          <Text>
            {currentYear}
            <Icon name="chevron-down" size={16} />
          </Text>
        </TouchableOpacity>

        <View row style={styles.rightIcons}>
          <Icon
            name="chevron-back"
            onPress={onPrevPress}
            disabled={yearsRef.current?.hasMinYear()}
          />
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.5}
            disabled={viewMode !== 'Days'}
            onPress={onTodayPress}>
            <Text
              style={[
                styles.todayText,
                viewMode !== 'Days' && {
                  color: colors.text400,
                },
              ]}>
              Today
            </Text>
          </TouchableOpacity>
          <Icon
            name="chevron-forward"
            onPress={onNextPress}
            disabled={yearsRef.current?.hasMaxYear()}
          />
        </View>
      </View>

      {viewMode === 'Days' && (
        <MonthDaysList
          currentMonth={currentMonth}
          currentYear={currentYear}
          selectedDate={selectedDate}
          disableDates={transformedDisabledDates}
          onItemPress={onDatePress}
        />
      )}
      {viewMode === 'Month' && (
        <MonthNamesList
          currentMonth={currentMonth}
          onItemPress={onMonthPress}
        />
      )}
      {viewMode === 'Year' && (
        <YearList
          ref={yearsRef}
          {...yearListProps}
          currentYear={currentYear}
          onItemPress={onYearPress}
        />
      )}
    </View>
  )
}

export default memo(Calendar)

const styles = StyleSheet.create({
  rightIcons: {
    alignItems: 'center',
  },
  todayText: {
    paddingHorizontal: 4,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 280,
    marginHorizontal: 8,
  },
})
