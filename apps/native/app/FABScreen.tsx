import React from 'react'
import {StyleSheet} from 'react-native'

import {View} from '@react-native-blossom-ui/components'
import {FABUsage, FABOffset} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function FABScreen() {
  return (
    <View style={styles.container}>
      <Heading>Usage</Heading>
      <FABUsage />

      <Heading>Offset</Heading>
      <FABOffset />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
