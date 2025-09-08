import React from 'react'
import {StyleSheet} from 'react-native'

import {Surface} from '@react-native-blossom-ui/components'
import {
  DatePickerUsage,
  DatePickerClearable,
  DatePickerDisplayFormat,
  DatePickerDefaultValue,
  DatePickerDisableDates,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function DatePickerScreen() {
  return (
    <Surface style={styles.container}>
      <AppScrollView contentContainerStyle={styles.scrollView}>
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
      </AppScrollView>

      <Heading>Auto Top Position</Heading>
      <DatePickerUsage />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  scrollView: {
    padding: 0,
  },
})
