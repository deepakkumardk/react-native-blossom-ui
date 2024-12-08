import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  PopoverFitTargetWidth,
  PopoverTargetRefUsage,
  PopoverUsage,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function PopoverScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <PopoverUsage />

        <Heading>Ref Usage</Heading>
        <PopoverTargetRefUsage />

        <Heading>Fit Target Width</Heading>
        <PopoverFitTargetWidth />
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
