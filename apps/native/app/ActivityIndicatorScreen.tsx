import React from 'react'
import {
  ActivityIndicatorCustom,
  ActivityIndicatorSizes,
  ActivityIndicatorStatuses,
  ActivityIndicatorUsage,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function ActivityIndicatorScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ActivityIndicatorUsage />

      <Heading>Status</Heading>
      <ActivityIndicatorStatuses />

      <Heading>Size</Heading>
      <ActivityIndicatorSizes />

      <Heading>Custom</Heading>
      <ActivityIndicatorCustom />
    </AppScrollView>
  )
}
