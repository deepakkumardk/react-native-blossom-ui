import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {TooltipUsage, TooltipCustom} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function TooltipScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <TooltipUsage />

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
