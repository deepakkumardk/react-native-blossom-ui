import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'

import {
  SegmentedButtonUsage,
  SegmentedButtonIcons,
  SegmentedButtonMultiSelect,
  SegmentedButtonModes,
  SegmentedButtonSizes,
  SegmentedButtonStatuses,
  SegmentedButtonDisabled,
  SegmentedButtonCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function SegmentedButtonScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <SegmentedButtonUsage />

        <Heading>Multi Select</Heading>
        <SegmentedButtonMultiSelect />

        <Heading>With Icon</Heading>
        <SegmentedButtonIcons />

        <Heading>Modes</Heading>
        <SegmentedButtonModes />

        <Heading>Sizes</Heading>
        <SegmentedButtonSizes />

        <Heading>Statuses</Heading>
        <SegmentedButtonStatuses />

        <Heading>Disabled</Heading>
        <SegmentedButtonDisabled />

        <Heading>Custom</Heading>
        <SegmentedButtonCustom />
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
