import React from 'react'

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

import {Heading, AppScrollView} from '../components'

export default function SegmentedButtonScreen() {
  return (
    <AppScrollView>
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
    </AppScrollView>
  )
}
