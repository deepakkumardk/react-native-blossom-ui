import React from 'react'

import {
  OverlayUsage,
  OverlayUpdate,
  OverlayRandom,
  OverlayBackdropBehavior,
  OverlayDuration,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function OverlayScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <OverlayUsage />

      <Heading>Backdrop Behavior</Heading>
      <OverlayBackdropBehavior />

      <Heading>Auto Hide Overlay</Heading>
      <OverlayDuration />

      <Heading>Update</Heading>
      <OverlayUpdate />

      <Heading>Random Overlay Positions</Heading>
      <OverlayRandom />
    </AppScrollView>
  )
}
