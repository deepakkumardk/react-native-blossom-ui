import React from 'react'

import {
  PopoverUsage,
  PopoverPosition,
  PopoverOffset,
  PopoverFitTargetWidth,
  PopoverTargetRefUsage,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function PopoverScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <PopoverUsage />

      <Heading>Position</Heading>
      <PopoverPosition />

      <Heading>Offset</Heading>
      <PopoverOffset />

      <Heading>Fit Target Width</Heading>
      <PopoverFitTargetWidth />

      <Heading>Ref Usage</Heading>
      <PopoverTargetRefUsage />
    </AppScrollView>
  )
}
