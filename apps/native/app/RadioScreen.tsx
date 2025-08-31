import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'

import {
  RadioCustom,
  RadioDefaultValue,
  RadioDisabled,
  RadioPositions,
  RadioSizes,
  RadioStatuses,
  RadioUsage,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function RadioScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <RadioUsage />

        <Heading>Positions</Heading>
        <RadioPositions />

        <Heading>Default Value</Heading>
        <RadioDefaultValue />

        <Heading>Sizes</Heading>
        <RadioSizes />

        <Heading>Statuses</Heading>
        <RadioStatuses />

        <Heading>Disabled</Heading>
        <RadioDisabled />

        <Heading>Custom</Heading>
        <RadioCustom />
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 64,
  },
})
