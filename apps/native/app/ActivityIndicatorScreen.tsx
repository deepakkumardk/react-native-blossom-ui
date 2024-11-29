import React from 'react'
import {StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  ActivityIndicatorCustom,
  ActivityIndicatorSizes,
  ActivityIndicatorStatuses,
  ActivityIndicatorUsage,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function ActivityIndicatorScreen() {
  return (
    <View style={styles.container}>
      <Heading>Usage</Heading>
      <ActivityIndicatorUsage />

      <Heading>Status</Heading>
      <ActivityIndicatorStatuses />

      <Heading>Size</Heading>
      <ActivityIndicatorSizes />

      <Heading>Custom</Heading>
      <ActivityIndicatorCustom />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
