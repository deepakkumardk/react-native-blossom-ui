import React from 'react'

import {
  PopoverOverlayUsage,
  PopoverOverlayPosition,
  PopoverOverlayOffset,
  PopoverOverlayArrow,
  PopoverOverlayArrowOffset,
  PopoverOverlayFitTargetWidth,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function PopoverScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <PopoverOverlayUsage />

      <Heading>Position</Heading>
      <PopoverOverlayPosition />

      <Heading>Offset</Heading>
      <PopoverOverlayOffset />

      <Heading>With Arrow</Heading>
      <PopoverOverlayArrow />

      <Heading>Arrow Offset</Heading>
      <PopoverOverlayArrowOffset />

      <Heading>Fit Target Width</Heading>
      <PopoverOverlayFitTargetWidth />
    </AppScrollView>
  )
}
