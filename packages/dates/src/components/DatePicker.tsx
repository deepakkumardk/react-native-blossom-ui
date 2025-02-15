import React, {useCallback, useEffect, useState} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {
  Icon,
  Popover,
  TextInput,
  useBlossomTheme,
  useMergedProps,
  View,
} from '@react-native-blossom-ui/components'

import {DatePickerProps} from '../types'
import MonthCalendar from './MonthCalendar'
import {convertToDayjs} from '../utils'

/**
 * A DatePicker with month day calendar in a popup view
 */
const DatePicker = (props: DatePickerProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    defaultDate,
    disableDates,
    displayDateFormat,
    outputDateFormat,
    clearable,
    onDateChange,
    disabled,
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

  const onDateChangeCallback = useCallback(
    (date?: Date, displayDate?: string, outputDate?: string) => {
      setDateValue(date)
      setFormattedDate(displayDate || '')
      setShowPopover(false)
      onDateChange?.(date, displayDate, outputDate)
    },
    [onDateChange],
  )

  useEffect(() => {
    if (defaultDate) {
      const daysDate = convertToDayjs(defaultDate, outputDateFormat)
      onDateChangeCallback(
        defaultDate instanceof Date ? defaultDate : daysDate.toDate(),
        daysDate.format(displayDateFormat),
        daysDate.format(outputDateFormat),
      )
    }
    // This effect should run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Popover
      visible={showPopover}
      wrapContent
      onBackdropPress={() => setShowPopover(false)}
      Target={
        <Pressable
          accessibilityRole="button"
          onPressIn={() => setShowPopover(true)}>
          <TextInput
            accessibilityLabel="Text input field"
            placeholder="Select Date"
            editable={false}
            focusable={false}
            value={formattedDate}
            onPressIn={() => setShowPopover(true)}
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
                    size={20}
                    style={styles.closeIcon}
                    color={colors.background700}
                    onPress={() => {
                      onDateChangeCallback?.(undefined)
                    }}
                  />
                )}
                <Icon name="calendar-outline" size={20} />
              </View>
            }
            inputStyle={[
              disabled && {
                backgroundColor: colors.background200,
              },
            ]}
            textStyle={[
              !disabled && {
                color: colors.text100,
              },
            ]}
            {...rest}
            disabled
          />
        </Pressable>
      }>
      <MonthCalendar
        defaultDate={dateValue}
        disableDates={disableDates}
        displayDateFormat={displayDateFormat}
        outputDateFormat={outputDateFormat}
        onDateChange={onDateChangeCallback}
      />
    </Popover>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  closeIcon: {
    paddingHorizontal: 6,
  },
})
