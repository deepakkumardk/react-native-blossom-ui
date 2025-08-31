import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'

import {
  CheckboxUsage,
  CheckboxCustomIcon,
  CheckboxDefaultValue,
  CheckboxDisabled,
  CheckboxIndeterminate,
  CheckboxPositions,
  CheckboxSizes,
  CheckboxStatuses,
  CheckboxCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function CheckboxScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <CheckboxUsage />

        <Heading>Custom Icon</Heading>
        <CheckboxCustomIcon />

        <Heading>Default Value</Heading>
        <CheckboxDefaultValue />

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
