import React from 'react'
import {StyleSheet} from 'react-native'

import {Surface} from '@react-native-blossom-ui/components'
import {
  SelectUsage,
  SelectDefaultValue,
  SelectClearable,
  SelectLoading,
  SelectMode,
  SelectCustomItem,
  SelectCustomStyle,
  SelectCustomPickerStyle,
  SelectDisabled,
  SelectObjectOptions,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function SelectScreen() {
  return (
    <Surface style={styles.container}>
      <AppScrollView contentContainerStyle={styles.scrollView}>
        <Heading>Usage</Heading>
        <SelectUsage />

        <Heading>Default Value</Heading>
        <SelectDefaultValue />

        <Heading>Clearable</Heading>
        <SelectClearable />

        <Heading>Loading</Heading>
        <SelectLoading />

        <Heading>Mode</Heading>
        <SelectMode />

        <Heading>Custom Item</Heading>
        <SelectCustomItem />

        <Heading>Custom Style</Heading>
        <SelectCustomStyle />

        <Heading>Custom Picker Style</Heading>
        <SelectCustomPickerStyle />

        <Heading>Disabled</Heading>
        <SelectDisabled />

        <Heading>Object List Options</Heading>
        <SelectObjectOptions />
      </AppScrollView>

      <Heading>Auto Top Position</Heading>
      <SelectUsage />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  scrollView: {
    padding: 0,
  },
})
