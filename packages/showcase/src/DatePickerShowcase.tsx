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

export function DatePickerMinDate() {
  return (
    <View>
      <DatePicker label="Passing as Date Object" minDate={new Date()} />
      <DatePicker
        label="Passing as formatted string"
        minDate="20-02-2025"
        outputDateFormat="DD-MM-YYYY"
      />
    </View>
  )
}

export function DatePickerMaxDate() {
  const today = new Date()
  const nextMonth = new Date()
  nextMonth.setMonth(today.getMonth() + 1)

  return (
    <View>
      <DatePicker label="Passing as Date Object" maxDate={new Date()} />
      <DatePicker label="Upto Next month" maxDate={nextMonth} />
      <DatePicker
        label="Passing as formatted string"
        maxDate="20-02-2028"
        outputDateFormat="DD-MM-YYYY"
      />
    </View>
  )
}

export function DatePickerMinMaxDate() {
  const today = new Date()
  const prevMonth = new Date()
  prevMonth.setMonth(today.getMonth() - 1)

  const nextMonth = new Date()
  nextMonth.setMonth(today.getMonth() + 1)

  return (
    <View>
      <DatePicker
        label="Min Max Date"
        minDate={prevMonth}
        maxDate={nextMonth}
      />
    </View>
  )
}

export function DatePickerDisabledDaysOfWeek() {
  return (
    <View>
      <DatePicker label="Disabled Days of Week" disabledDaysOfWeek={[0, 6]} />
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

export function DatePickerDatePickerModes() {
  return (
    <View>
      <DatePicker
        label="Single Date Selection"
        datePickerMode="single"
        clearable
      />
      <DatePicker
        label="Multiple Date Selection"
        datePickerMode="multiple"
        clearable
      />
      <DatePicker
        label="Range Date Selection"
        datePickerMode="range"
        clearable
      />
    </View>
  )
}
