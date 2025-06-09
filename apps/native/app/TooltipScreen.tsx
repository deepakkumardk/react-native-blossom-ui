import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  TooltipUsage,
  TooltipAtEdge,
  TooltipCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function TooltipScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <TooltipUsage />

        <Heading>At Edge</Heading>
        <TooltipAtEdge />

        <Heading>Custom</Heading>
        <TooltipCustom />
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
