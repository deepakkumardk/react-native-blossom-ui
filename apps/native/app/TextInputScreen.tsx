import React from 'react'

import {
  TextInputUsage,
  TextInputModes,
  TextInputSizes,
  TextInputStatuses,
  TextInputDisabled,
  TextInputError,
  TextInputDense,
  TextInputCustom,
  TextInputIcons,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function TextInputScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <TextInputUsage />

      <Heading>Modes</Heading>
      <TextInputModes />

      <Heading>Dense</Heading>
      <TextInputDense />

      <Heading>Sizes</Heading>
      <TextInputSizes />

      <Heading>Disabled</Heading>
      <TextInputDisabled />

      <Heading>Error</Heading>
      <TextInputError />

      <Heading>Icons</Heading>
      <TextInputIcons />

      <Heading>Statuses</Heading>
      <TextInputStatuses />

      <Heading>Custom</Heading>
      <TextInputCustom />
    </AppScrollView>
  )
}
