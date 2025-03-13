import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {Spacer, View} from '@react-native-blossom-ui/components'
import {
  DateSelectPickerUsage,
  MonthPickerUsage,
} from '@react-native-blossom-ui/showcase'

import {MonthPicker, YearPicker} from '@react-native-blossom-ui/dates'
import {Heading} from '../components'

export default function DateSelectPickerScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
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
      </ScrollView>

      <Heading>Auto Top Position</Heading>
      <DateSelectPickerUsage />
      <Spacer height={80} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
