import React from 'react'

import {View} from '@react-native-blossom-ui/components'
import {DatePicker} from '@react-native-blossom-ui/dates'

export function DatePickerUsage() {
  return (
    <View>
      <DatePicker />
    </View>
  )
}

export function DatePickerClearable() {
  return (
    <View>
      <DatePicker clearable />
    </View>
  )
}

export function DatePickerDisplayFormat() {
  return (
    <View>
      <DatePicker clearable displayDateFormat="MMMM DD YYYY" />
    </View>
  )
}

export function DatePickerDefaultValue() {
  return (
    <View>
      <DatePicker label="Passing as Date Object" defaultDate={new Date()} />
      <DatePicker
        label="Passing as formatted string"
        defaultDate="20-02-2025"
        outputDateFormat="DD-MM-YYYY"
      />
    </View>
  )
}

export function DatePickerDisableDates() {
  const yesterday = new Date()
  yesterday.setFullYear(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate() - 1,
  )

  const tomorrow = new Date()
  tomorrow.setFullYear(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate() + 1,
  )

  return (
    <View>
      <DatePicker
        label="Disabling Specific Dates"
        placeholder="Disabling Specific Dates"
        disableDates={[yesterday, new Date(), tomorrow, '10-02-2025']}
        outputDateFormat="DD-MM-YYYY"
      />

      <DatePicker
        label="Disabling Future Dates"
        placeholder="Disabling Future Dates"
        disableFutureDates
      />
      <DatePicker
        label="Disabling Past Dates"
        placeholder="Disabling Past Dates"
        disablePastDates
      />
    </View>
  )
}
