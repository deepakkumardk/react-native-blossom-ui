import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {Surface} from '@react-native-blossom-ui/components'
import {
  DatePickerUsage,
  DatePickerClearable,
  DatePickerDisplayFormat,
  DatePickerDefaultValue,
  DatePickerDisableDates,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function DatePickerScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <DatePickerUsage />

        <Heading>Clearable</Heading>
        <DatePickerClearable />

        <Heading>Display Format</Heading>
        <DatePickerDisplayFormat />

        <Heading>Default Value</Heading>
        <DatePickerDefaultValue />

        <Heading>Disable Dates</Heading>
        <DatePickerDisableDates />
      </ScrollView>

      <Heading>Auto Top Position</Heading>
      <DatePickerUsage />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
