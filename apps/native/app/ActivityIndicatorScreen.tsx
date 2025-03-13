import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
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
      <ScrollView>
        <Heading>Usage</Heading>
        <ActivityIndicatorUsage />

        <Heading>Status</Heading>
        <ActivityIndicatorStatuses />

        <Heading>Size</Heading>
        <ActivityIndicatorSizes />

        <Heading>Custom</Heading>
        <ActivityIndicatorCustom />
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
