import React from 'react'

import {View} from '@react-native-blossom-ui/components'
import {
  DateSelectPicker,
  MonthPicker,
  YearPicker,
} from '@react-native-blossom-ui/dates'

export function DateSelectPickerUsage() {
  return (
    <View>
      <DateSelectPicker />
    </View>
  )
}

export function MonthPickerUsage() {
  return (
    <View>
      <MonthPicker />
    </View>
  )
}

export function YearPickerUsage() {
  return (
    <View>
      <YearPicker />
    </View>
  )
}
