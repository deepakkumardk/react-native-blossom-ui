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

import {DatePickerProps} from '../types'
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
    disableDates,
    displayDateFormat = DEFAULT_DISPLAY_FORMAT,
    outputDateFormat = DEFAULT_OUTPUT_FORMAT,
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

  const targetViewRef = useRef<RNView>(null)

  const {offset, pickerPosition, setPressableLayout} = useCalculatedPosition(
    300,
    showPopover,
    targetViewRef,
  )

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position={pickerPosition}
      offset={offset}
      Target={
        <Pressable
          ref={targetViewRef}
          accessibilityRole="button"
          onPress={() => setShowPopover(true)}
          onLayout={(e) => setPressableLayout(e.nativeEvent.layout)}>
          <TextInput
            accessibilityLabel="Date input field"
            placeholder="Select Date"
            shouldMockDisableState
            value={formattedDate}
            onPressOut={() => setShowPopover(true)}
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
          />
        </Pressable>
      }>
      <Calendar
        selectedDate={dateValue}
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
