import React, {useCallback, useState} from 'react'
import {
  Icon,
  Popover,
  TextInput,
  useBlossomTheme,
  useMergedProps,
} from '@react-native-blossom-ui/components'
import {Pressable} from 'react-native'
import {DatePickerProps} from '../types'
import MonthCalendar from './MonthCalendar'

/**
 * A DatePicker with month day calendar in a popup view
 */
const DatePicker = (props: DatePickerProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {displayDateFormat, outputDateFormat, onDateChange, disabled, ...rest} =
    useMergedProps('DatePicker', props, {
      colors,
      isDark,
    })

  const [showPopover, setShowPopover] = useState(false)
  const [formattedDate, setFormattedDate] = useState('')

  const onDateChangeCallback = useCallback(
    (date?: Date, displayDate?: string, outputDate?: string) => {
      setFormattedDate(displayDate || '')
      setShowPopover(false)
      onDateChange?.(date, displayDate, outputDate)
    },
    [onDateChange],
  )

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
            right={<Icon name="calendar-outline" size={20} />}
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
        displayDateFormat={displayDateFormat}
        outputDateFormat={outputDateFormat}
        onDateChange={onDateChangeCallback}
      />
    </Popover>
  )
}

export default DatePicker
