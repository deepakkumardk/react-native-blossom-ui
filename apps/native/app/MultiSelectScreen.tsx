import React from 'react'

import {
  MultiSelectUsage,
  MultiSelectClearable,
  MultiSelectDefaultValue,
  MultiSelectMode,
  MultiSelectControlled,
  MultiSelectCustomStyle,
  MultiSelectCustomPickerStyle,
  MultiSelectDisabled,
  MultiSelectMaxSelect,
  MultiSelectObjectOptions,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function MultiSelectScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <MultiSelectUsage />

      <Heading>Default Value</Heading>
      <MultiSelectDefaultValue />

      <Heading>Clearable</Heading>
      <MultiSelectClearable />

      <Heading>Modes</Heading>
      <MultiSelectMode />

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
    </AppScrollView>
  )
}
