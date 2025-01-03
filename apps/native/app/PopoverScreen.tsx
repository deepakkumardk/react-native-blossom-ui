import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  PopoverUsage,
  PopoverPosition,
  PopoverOffset,
  PopoverFitTargetWidth,
  PopoverTargetRefUsage,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function PopoverScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
