import React, {useCallback, useMemo, useRef, useState} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {
  Icon,
  Text,
  useBlossomTheme,
  View,
} from '@react-native-blossom-ui/components'

import {MonthCalendarProps, MonthDayItem, YearsListRef} from './types'
import {getDateWithDMY, getFormattedDate} from './utils'
import MonthDaysList from './MonthDaysList'
import MonthNamesList from './MonthNamesList'
import YearList from './YearList'

/**
 * Display the calendar days of the month with current month-year text
 */
function MonthCalendar(props: MonthCalendarProps) {
  const {colors, isDark} = useBlossomTheme()

  const {yearListProps} = props

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth())
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear())
  const [viewMode, setViewMode] = useState<'Days' | 'Month' | 'Year'>('Days')

  const yearsRef = useRef<YearsListRef>(null)

  const onMonthHeaderPress = useCallback(() => {
    setViewMode((prev) => {
      if (prev === 'Month') {
        return 'Days'
      }
      return 'Month'
    })
  }, [])

  const onYearHeaderPress = useCallback(() => {
    setViewMode((prev) => {
      if (prev === 'Year') {
        return 'Days'
      }
      return 'Year'
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

    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
  }, [viewMode])

  const onDatePress = useCallback((item: MonthDayItem) => {
    setSelectedDate(getDateWithDMY(item.day, item.month, item.year))
  }, [])

  const onMonthPress = useCallback((month: number) => {
    setCurrentMonth(month)
    setViewMode('Days')
  }, [])

  const onYearPress = useCallback((year: number) => {
    setCurrentYear(year)
    setViewMode('Days')
  }, [])

  const formattedMonth = useMemo(() => {
    return getFormattedDate(
      getDateWithDMY(1, currentMonth, currentYear),
      'MMMM',
    )
  }, [currentMonth, currentYear])

  return (
    <View>
      <View row style={styles.header}>
        <Text onPress={onMonthHeaderPress}>
          {formattedMonth}
          <Icon name="chevron-down" size={16} />
        </Text>
        <Text onPress={onYearHeaderPress}>
          {currentYear}
          <Icon name="chevron-down" size={16} />
        </Text>

        <View row style={{alignItems: 'center'}}>
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

export default MonthCalendar

const styles = StyleSheet.create({
  todayText: {
    paddingHorizontal: 4,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 300,
    marginHorizontal: 8,
  },
  day: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
