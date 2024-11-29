import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'

import {
  SwitchCustom,
  SwitchDisabled,
  SwitchPositions,
  SwitchSizes,
  SwitchStatuses,
  SwitchUsage,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function SwitchScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <SwitchUsage />

        <Heading>Positions</Heading>
        <SwitchPositions />

        <Heading>Sizes</Heading>
        <SwitchSizes />

        <Heading>Statuses</Heading>
        <SwitchStatuses />

        <Heading>Disabled</Heading>
        <SwitchDisabled />

        <Heading>Custom</Heading>
        <SwitchCustom />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 64,
  },
})
