import React, {memo, useCallback, useMemo, useRef, useState} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {
  Icon,
  Surface,
  Text,
  useBlossomTheme,
  View,
} from '@react-native-blossom-ui/components'

import {CalendarProps, MonthDayItem, YearsListRef} from '../types'
import {
  convertToDayjs,
  getDateWithDMY,
  getFormattedDate,
  isAfter,
  isSameDate,
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
    selectedEndDate: propSelectedEndDate,
    selectedDates = [],
    displayDateFormat = DEFAULT_DISPLAY_FORMAT,
    outputDateFormat = DEFAULT_OUTPUT_FORMAT,
    datePickerMode = 'single',
    minDate,
    maxDate,
    disableDates,
    disableFutureDates,
    disablePastDates,
    disabledDaysOfWeek,
    yearListProps,
    onDateChange,
    containerStyle,
  } = props

  const today = useRef(new Date()).current

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date instanceof Date ? date : toDate(date, displayDateFormat),
  )

  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    propSelectedEndDate instanceof Date
      ? propSelectedEndDate
      : toDate(propSelectedEndDate, displayDateFormat),
  )

  const [multipleSelectedDates, setMultipleSelectedDates] = useState<Date[]>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    selectedDates
      .map((d) => (d instanceof Date ? d : toDate(d, displayDateFormat)))
      .filter(Boolean),
  )

  const [currentMonth, setCurrentMonth] = useState(
    (selectedDate?.getDate() ? selectedDate : today)?.getMonth(),
  )
  const [currentYear, setCurrentYear] = useState(
    (selectedDate?.getDate() ? selectedDate : today)?.getFullYear(),
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
      const display = getFormattedDate(newDate, displayDateFormat)
      const output = getFormattedDate(newDate, outputDateFormat)

      if (datePickerMode === 'single') {
        setSelectedDate(newDate)
        setSelectedEndDate(undefined)
        setMultipleSelectedDates([])
        onDateChange?.({
          mode: 'single',
          date: newDate,
          displayDate: display,
          outputDate: output,
        })
      } else if (datePickerMode === 'multiple') {
        setSelectedDate(undefined)
        const isAlreadySelected = multipleSelectedDates.some((selected) =>
          isSameDate(selected, item),
        )
        let updatedDates: Date[] = []
        if (isAlreadySelected) {
          updatedDates = multipleSelectedDates.filter(
            (selected) => !isSameDate(selected, item),
          )
        } else {
          updatedDates = [...multipleSelectedDates, newDate]
        }
        setMultipleSelectedDates(updatedDates)
        onDateChange?.({
          mode: 'multiple',
          dates: updatedDates,
          displayDate: updatedDates.map((d) =>
            getFormattedDate(d, displayDateFormat),
          ),
          outputDate: updatedDates.map((d) =>
            getFormattedDate(d, outputDateFormat),
          ),
        })
      } else if (datePickerMode === 'range') {
        if (selectedDate && selectedEndDate) {
          setSelectedDate(newDate)
          setSelectedEndDate(undefined)
          onDateChange?.({
            mode: 'range',
            startDate: newDate,
            endDate: undefined,
            displayStartDate: display,
            outputStartDate: output,
          })
        } else if (selectedDate && !selectedEndDate) {
          if (
            isAfter({dmy: item, referenceDate: selectedDate, outputDateFormat})
          ) {
            setSelectedEndDate(newDate)
            onDateChange?.({
              mode: 'range',
              startDate: selectedDate,
              endDate: newDate,
              displayStartDate: getFormattedDate(
                selectedDate,
                displayDateFormat,
              ),
              outputStartDate: getFormattedDate(selectedDate, outputDateFormat),
              displayEndDate: display,
              outputEndDate: output,
            })
          } else {
            setSelectedDate(newDate)
            setSelectedEndDate(undefined)
            onDateChange?.({
              mode: 'range',
              startDate: newDate,
              endDate: undefined,
              displayStartDate: display,
              outputStartDate: output,
            })
          }
        } else {
          setSelectedDate(newDate)
          onDateChange?.({
            mode: 'range',
            startDate: newDate,
            endDate: undefined,
            displayStartDate: display,
            outputStartDate: output,
          })
        }
      }
    },
    [
      datePickerMode,
      onDateChange,
      displayDateFormat,
      outputDateFormat,
      selectedDate,
      selectedEndDate,
      multipleSelectedDates,
    ],
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
        weekDay: dateValue.day(),
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
    <Surface style={containerStyle}>
      <View row style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.5}
          onPress={onMonthHeaderPress}>
          <Text>
            {formattedMonth}
            <Icon name="chevron-down" family="Ionicons" size={16} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.5}
          onPress={onYearHeaderPress}>
          <Text>
            {currentYear}
            <Icon name="chevron-down" family="Ionicons" size={16} />
          </Text>
        </TouchableOpacity>

        <View row style={styles.rightIcons}>
          <Icon
            name="chevron-back"
            family="Ionicons"
            onPress={onPrevPress}
            disabled={yearsRef.current?.hasMinYear()}
          />
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.5}
            disabled={viewMode !== 'Days'}
            onPress={onTodayPress}>
            <Text
              status="primary"
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
            family="Ionicons"
            onPress={onNextPress}
            disabled={yearsRef.current?.hasMaxYear()}
          />
        </View>
      </View>

      {viewMode === 'Days' && (
        <MonthDaysList
          datePickerMode={datePickerMode}
          selectedDate={selectedDate}
          selectedEndDate={selectedEndDate}
          selectedDates={multipleSelectedDates}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onItemPress={onDatePress}
          disablePastDates={disablePastDates}
          disableFutureDates={disableFutureDates}
          disableDates={transformedDisabledDates}
          disabledDaysOfWeek={disabledDaysOfWeek}
          displayDateFormat={displayDateFormat}
          outputDateFormat={outputDateFormat}
          minDate={minDate}
          maxDate={maxDate}
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
    </Surface>
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
