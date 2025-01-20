import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  ShimmerViewUsage,
  ShimmerViewCircular,
  ShimmerViewVisibility,
  ShimmerViewCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function ShimmerViewScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <ShimmerViewUsage />

        <Heading>Circular</Heading>
        <ShimmerViewCircular />

        <Heading>Visibility</Heading>
        <ShimmerViewVisibility />

        <Heading>Custom</Heading>
        <ShimmerViewCustom />
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
