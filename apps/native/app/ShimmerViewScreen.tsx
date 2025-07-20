import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
import {
  ShimmerViewUsage,
  ShimmerViewCircular,
  ShimmerViewVisibility,
  ShimmerViewDuration,
  ShimmerViewStopAnimation,
  ShimmerViewWave,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function ShimmerViewScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
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
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
