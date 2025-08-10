import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {Surface} from '@react-native-blossom-ui/components'
import {
  MultiSelectUsage,
  MultiSelectClearable,
  MultiSelectControlled,
  MultiSelectCustomStyle,
  MultiSelectCustomPickerStyle,
  MultiSelectDisabled,
  MultiSelectMaxSelect,
  MultiSelectObjectOptions,
  MultiSelectDefaultValue,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function MultiSelectScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <MultiSelectUsage />

        <Heading>Default Value</Heading>
        <MultiSelectDefaultValue />

        <Heading>Clearable</Heading>
        <MultiSelectClearable />

        <Heading>Custom Style</Heading>
        <MultiSelectCustomStyle />

        <Heading>Custom Picker Style</Heading>
        <MultiSelectCustomPickerStyle />

        <Heading>Disabled</Heading>
        <MultiSelectDisabled />

        <Heading>Max Select</Heading>
        <MultiSelectMaxSelect />

        <Heading>Controlled</Heading>
        <MultiSelectControlled />

        <Heading>Object List Options</Heading>
        <MultiSelectObjectOptions />
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
