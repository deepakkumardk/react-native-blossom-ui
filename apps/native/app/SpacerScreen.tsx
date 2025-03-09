import React from 'react'
import {StyleSheet} from 'react-native'

import {View} from '@react-native-blossom-ui/components'
import {
  SpacerOnBackground,
  SpacerUsage,
  SpacerVertical,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function SpacerScreen() {
  return (
    <View style={styles.container}>
      <Heading>Usage</Heading>
      <SpacerUsage />

      <Heading>Horizontal Spacing</Heading>
      <SpacerVertical />

      <Heading>On Background</Heading>
      <SpacerOnBackground />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
