import React, {useState} from 'react'
import {
  Select,
  useBlossomTheme,
  useMergedProps,
} from '@react-native-blossom-ui/components'
import {StyleSheet} from 'react-native'
import {MonthPickerProps} from '../types'

import {MONTHS_ARRAY} from './constants'

/**
 * Show a select picker for the months
 */
function MonthPicker(props: MonthPickerProps) {
  const {colors, isDark} = useBlossomTheme()

  const {currentMonth, onItemPress, containerStyle} = useMergedProps(
    'MonthPicker',
    props,
    {
      colors,
      isDark,
    },
  )

  const [selectedMonth, setSelectedMonth] = useState('')

  return (
    <Select
      placeholder="Month"
      value={(currentMonth && MONTHS_ARRAY[currentMonth]) || selectedMonth}
      options={MONTHS_ARRAY.map((value) => ({
        label: value,
        value,
      }))}
      onValueChange={(value) => {
        if (value !== undefined) {
          onItemPress?.(MONTHS_ARRAY.findIndex((item) => item === value))
          setSelectedMonth(value)
        }
      }}
      inputProps={{
        containerStyle: [styles.container, containerStyle],
      }}
    />
  )
}

export default MonthPicker

const styles = StyleSheet.create({
  container: {
    minWidth: 140,
  },
})
