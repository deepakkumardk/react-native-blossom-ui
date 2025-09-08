import React from 'react'

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

import {Heading, AppScrollView} from '../components'

export default function CheckboxScreen() {
  return (
    <AppScrollView>
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
    </AppScrollView>
  )
}
