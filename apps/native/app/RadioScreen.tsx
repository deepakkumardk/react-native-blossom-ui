import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'

import {
  RadioCustom,
  RadioDisabled,
  RadioPositions,
  RadioSizes,
  RadioStatuses,
  RadioUsage,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function RadioScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <RadioUsage />

        <Heading>Positions</Heading>
        <RadioPositions />

        <Heading>Sizes</Heading>
        <RadioSizes />

        <Heading>Statuses</Heading>
        <RadioStatuses />

        <Heading>Disabled</Heading>
        <RadioDisabled />

        <Heading>Custom</Heading>
        <RadioCustom />
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
