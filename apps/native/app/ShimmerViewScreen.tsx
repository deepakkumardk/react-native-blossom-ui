import React from 'react'

import {
  ShimmerViewUsage,
  ShimmerViewCircular,
  ShimmerViewVisibility,
  ShimmerViewDuration,
  ShimmerViewStopAnimation,
  ShimmerViewWave,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function ShimmerViewScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ShimmerViewUsage />

      <Heading>Circular</Heading>
      <ShimmerViewCircular />

      <Heading>Wave</Heading>
      <ShimmerViewWave />

      <Heading>Animation Duration</Heading>
      <ShimmerViewDuration />

      <Heading>Stop Animation</Heading>
      <ShimmerViewStopAnimation />

      <Heading>Visibility</Heading>
      <ShimmerViewVisibility />
    </AppScrollView>
  )
}
