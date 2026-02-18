import React from 'react'

import {
  OverlayUsage,
  OverlayUpdate,
  OverlayRandom,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function OverlayScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <OverlayUsage />

      <Heading>Update</Heading>
      <OverlayUpdate />

      <Heading>Random Overlay Positions</Heading>
      <OverlayRandom />
    </AppScrollView>
  )
}
