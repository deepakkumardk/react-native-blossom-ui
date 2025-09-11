import React from 'react'

import {
  ProgressBarUsage,
  ProgressBarIndeterminate,
  ProgressBarStatuses,
  ProgressBarSizes,
  ProgressBarCustom,
  ProgressBarDirection,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function ProgressBarScreen() {
  return (
    <AppScrollView>
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
    </AppScrollView>
  )
}
