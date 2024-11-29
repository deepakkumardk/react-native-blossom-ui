import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'

import {
  CheckboxUsage,
  CheckboxCustom,
  CheckboxDisabled,
  CheckboxIndeterminate,
  CheckboxPositions,
  CheckboxSizes,
  CheckboxStatuses,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function CheckboxScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <CheckboxUsage />

        <Heading>Positions</Heading>
        <CheckboxPositions />

        <Heading>Sizes</Heading>
        <CheckboxSizes />

        <Heading>Statuses</Heading>
        <CheckboxStatuses />

        <Heading>Disabled</Heading>
        <CheckboxDisabled />

        <Heading>Indeterminate</Heading>
        <CheckboxIndeterminate />

        <Heading>Custom</Heading>
        <CheckboxCustom />
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
