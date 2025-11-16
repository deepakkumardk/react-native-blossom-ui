import React, {useCallback, useEffect, useRef, useState} from 'react'
import {View as RNView, Pressable, StyleSheet} from 'react-native'

import {
  Icon,
  Popover,
  TextInput,
  useBlossomTheme,
  useCalculatedPosition,
  useMergedProps,
  View,
} from '@react-native-blossom-ui/components'

import {DatePickerProps, CalendarDateChange} from '../types'
import Calendar from './Calendar'
import {convertToDayjs} from '../utils'
import {DEFAULT_DISPLAY_FORMAT, DEFAULT_OUTPUT_FORMAT} from './constants'

/**
 * A DatePicker with month day calendar in a popup view
 */
const DatePicker = (props: DatePickerProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    defaultDate,
    minDate,
    maxDate,
    datePickerMode,
    disableFutureDates,
    disablePastDates,
    disabledDaysOfWeek,
    disableDates,
    displayDateFormat = DEFAULT_DISPLAY_FORMAT,
    outputDateFormat = DEFAULT_OUTPUT_FORMAT,
    clearable,
    onDateChange,
    disabled,
    showAdjacentMonthDays = true,
    dateDisplayDelimiter = datePickerMode === 'range' ? ' to ' : ' ... ',
    ...rest
  } = useMergedProps('DatePicker', props, {
    colors,
    isDark,
  })

  const [showPopover, setShowPopover] = useState(false)
  const [dateValue, setDateValue] = useState<Date | string | undefined>(
    defaultDate,
  )
  const [formattedDate, setFormattedDate] = useState('')

  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    undefined,
  )

  const [multipleSelectedDates, setMultipleSelectedDates] = useState<Date[]>([])

  const targetViewRef = useRef<RNView>(null)

  const {offset, pickerPosition, setPressableLayout} = useCalculatedPosition(
    300,
    showPopover,
    targetViewRef,
  )

  const onClearDate = useCallback(() => {
    setDateValue(undefined)
    setSelectedEndDate(undefined)
    setFormattedDate('')
    setMultipleSelectedDates([])
    setShowPopover(false)

    if (datePickerMode === 'single') {
      onDateChange?.({
        mode: 'single',
        date: undefined,
        displayDate: '',
        outputDate: '',
      })
    } else if (datePickerMode === 'multiple') {
      onDateChange?.({
        mode: 'multiple',
        dates: [],
        displayDate: [],
        outputDate: [],
      })
    } else if (datePickerMode === 'range') {
      onDateChange?.({
        mode: 'range',
        startDate: undefined,
        endDate: undefined,
        displayStartDate: '',
        displayEndDate: '',
        outputStartDate: '',
        outputEndDate: '',
      })
    }
  }, [datePickerMode, onDateChange])

  const onDateChangeCallback = useCallback(
    (changedData: CalendarDateChange) => {
      if (changedData.mode === 'single') {
        setDateValue(changedData.date)
        setFormattedDate(changedData.displayDate)
        setShowPopover(false)
      } else if (changedData.mode === 'multiple') {
        const firstDate = changedData.dates[0]
        // Use delimiter between first and last selected items
        const firstDisplay = changedData.displayDate[0] || ''
        const lastDisplay =
          changedData.displayDate[changedData.displayDate.length - 1] || ''
        const display =
          firstDisplay && lastDisplay && changedData.dates.length > 1
            ? `${firstDisplay}${dateDisplayDelimiter}${lastDisplay}`
            : firstDisplay || lastDisplay || ''
        // TODO: recheck it later
        setDateValue(firstDate)
        setFormattedDate(display)
        setMultipleSelectedDates(changedData.dates)
      } else if (changedData.mode === 'range') {
        const startDisplay = changedData.displayStartDate || ''
        const endDisplay = changedData.displayEndDate || ''
        // Use delimiter between start and end date
        const display =
          startDisplay && endDisplay
            ? `${startDisplay}${dateDisplayDelimiter}${endDisplay}`
            : startDisplay || endDisplay || ''
        setDateValue(changedData.startDate)
        setFormattedDate(display)
        setSelectedEndDate(changedData.endDate)
      }

      onDateChange?.(changedData)
    },
    [dateDisplayDelimiter, onDateChange],
  )

  const showPicker = useCallback(() => {
    if (disabled) return

    setShowPopover(true)
  }, [disabled])

  useEffect(() => {
    if (defaultDate) {
      const daysDate = convertToDayjs(defaultDate, outputDateFormat)
      onDateChangeCallback({
        mode: 'single',
        date: defaultDate instanceof Date ? defaultDate : daysDate.toDate(),
        displayDate: daysDate.format(displayDateFormat),
        outputDate: daysDate.format(outputDateFormat),
      })
    }
    // This effect should run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Popover
      visible={showPopover}
      wrapContent
      onBackdropPress={() => setShowPopover(false)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position={pickerPosition}
      offset={offset}
      contentStyle={{
        padding: 0,
        overflow: 'hidden',
      }}
      Target={
        <Pressable
          ref={targetViewRef}
          accessibilityRole="button"
          style={{zIndex: 10}}
          // TODO: NOTE: fix this - this will trigger the popover on the whole label,input,error container
          onPress={showPicker}
          onLayout={(e) => setPressableLayout(e.nativeEvent.layout)}>
          <TextInput
            accessibilityLabel="Date input field"
            placeholder="Select Date"
            shouldMockDisableState
            value={formattedDate}
            pointerEvents="none"
            // onPressOut={() => setShowPopover(true)}
            right={
              <View
                row
                style={[
                  disabled && {
                    backgroundColor: colors.background200,
                  },
                ]}>
                {clearable && dateValue && (
                  <Icon
                    name="close"
                    family="Ionicons"
                    size={20}
                    style={styles.closeIcon}
                    color={colors.background700}
                    onPress={onClearDate}
                  />
                )}
                <Icon name="calendar-outline" family="Ionicons" size={20} />
              </View>
            }
            {...rest}
            inputContainerStyle={[
              disabled && {
                backgroundColor: colors.background200,
              },
              rest?.inputContainerStyle,
            ]}
            inputTextStyle={[
              !disabled && {
                color: colors.text100,
              },
              rest?.inputTextStyle,
            ]}
          />
        </Pressable>
      }>
      <Calendar
        datePickerMode={datePickerMode}
        selectedDate={dateValue}
        selectedEndDate={selectedEndDate}
        selectedDates={multipleSelectedDates}
        disableFutureDates={disableFutureDates}
        disablePastDates={disablePastDates}
        disableDates={disableDates}
        disabledDaysOfWeek={disabledDaysOfWeek}
        displayDateFormat={displayDateFormat}
        outputDateFormat={outputDateFormat}
        onDateChange={onDateChangeCallback}
        containerStyle={styles.calendarContainer}
        showAdjacentMonthDays={showAdjacentMonthDays}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Popover>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  closeIcon: {
    paddingHorizontal: 6,
  },
  calendarContainer: {
    padding: 6,
  },
})
