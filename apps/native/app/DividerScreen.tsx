import React from 'react'
import {StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
import {
  DividerCustom,
  DividerLabel,
  DividerSpacing,
  DividerUsage,
  DividerVertical,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function DividerScreen() {
  return (
    <Surface style={styles.container}>
      <Heading>Usage</Heading>
      <DividerUsage />

      <Heading>Label Positions</Heading>
      <DividerLabel />

      <Heading>Spacing</Heading>
      <DividerSpacing />

      <Heading>Vertical</Heading>
      <DividerVertical />

      <Heading>Custom</Heading>
      <DividerCustom />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
