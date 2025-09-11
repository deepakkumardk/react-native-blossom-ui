import React from 'react'

import {
  RadioCustom,
  RadioDefaultValue,
  RadioDisabled,
  RadioPositions,
  RadioSizes,
  RadioStatuses,
  RadioTextFieldsContainerStyle,
  RadioUsage,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function RadioScreen() {
  return (
    <AppScrollView>
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

      <Heading>Text Fields Container Style</Heading>
      <RadioTextFieldsContainerStyle />

      <Heading>Custom</Heading>
      <RadioCustom />
    </AppScrollView>
  )
}
