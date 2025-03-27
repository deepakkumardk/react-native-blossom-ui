import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  ProgressBarUsage,
  ProgressBarIndeterminate,
  ProgressBarStatuses,
  ProgressBarSizes,
  ProgressBarCustom,
  ProgressBarDirection,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function ProgressBarScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <ProgressBarUsage />

        <Heading>Indeterminate</Heading>
        <ProgressBarIndeterminate />

        <Heading>Direction</Heading>
        <ProgressBarDirection />

        <Heading>Statuses</Heading>
        <ProgressBarStatuses />

        <Heading>Sizes</Heading>
        <ProgressBarSizes />

        <Heading>Custom</Heading>
        <ProgressBarCustom />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
