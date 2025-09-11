import React from 'react'
import {StyleSheet} from 'react-native'

import {Spacer, View, Surface} from '@react-native-blossom-ui/components'
import {
  DateSelectPickerUsage,
  MonthPickerUsage,
} from '@react-native-blossom-ui/showcase'

import {MonthPicker, YearPicker} from '@react-native-blossom-ui/dates'
import {Heading, AppScrollView} from '../components'

export default function DateSelectPickerScreen() {
  return (
    <Surface style={styles.container}>
      <AppScrollView contentContainerStyle={styles.scrollView}>
        <Heading>Usage</Heading>
        <DateSelectPickerUsage />

        <Heading>Month Picker</Heading>
        <MonthPickerUsage />

        <Heading>Year Picker</Heading>
        <YearPicker />

        <Heading>Month-Year Picker</Heading>
        <View row>
          <MonthPicker />
          <YearPicker />
        </View>
      </AppScrollView>

      <Heading>Auto Top Position</Heading>
      <DateSelectPickerUsage />
      <Spacer height={80} />
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
