import React from 'react'

import {
  SwitchCustom,
  SwitchDefaultValue,
  SwitchControlled,
  SwitchDisabled,
  SwitchError,
  SwitchPositions,
  SwitchSizes,
  SwitchStatuses,
  SwitchTextFieldsContainerStyle,
  SwitchUsage,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function SwitchScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <SwitchUsage />

      <Heading>Default Value</Heading>
      <SwitchDefaultValue />

      <Heading>Controlled</Heading>
      <SwitchControlled />

      <Heading>Positions</Heading>
      <SwitchPositions />

      <Heading>Sizes</Heading>
      <SwitchSizes />

      <Heading>Statuses</Heading>
      <SwitchStatuses />

      <Heading>Disabled</Heading>
      <SwitchDisabled />

      <Heading>Text Fields Container Style</Heading>
      <SwitchTextFieldsContainerStyle />

      <Heading>Error</Heading>
      <SwitchError />

      <Heading>Custom</Heading>
      <SwitchCustom />
    </AppScrollView>
  )
}
