import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {Surface} from '@react-native-blossom-ui/components'
import {CalendarUsage} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function DatePickerScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <CalendarUsage />
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
