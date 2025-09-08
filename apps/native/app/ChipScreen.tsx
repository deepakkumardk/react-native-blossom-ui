import React from 'react'

import {
  ChipUsage,
  ChipViewOnly,
  ChipClearable,
  ChipCheckIcon,
  ChipWithoutCheckIcon,
  ChipAsBadge,
  ChipModes,
  ChipSizes,
  ChipStatusesMobile,
  ChipDisabled,
  ChipModesSizesMobile,
  ChipAllStatuses,
  ChipCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function ChipScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ChipUsage />

      <Heading>View Only</Heading>
      <ChipViewOnly />

      <Heading>Clearable</Heading>
      <ChipClearable />

      <Heading>Hide Check Icon</Heading>
      <ChipWithoutCheckIcon />

      <Heading>Custom Check Icon</Heading>
      <ChipCheckIcon />

      <Heading>As Badge</Heading>
      <ChipAsBadge />

      <Heading>Statuses</Heading>
      <ChipStatusesMobile />

      <Heading>Sizes</Heading>
      <ChipSizes />

      <Heading>Modes</Heading>
      <ChipModes />

      <Heading>Disabled</Heading>
      <ChipDisabled />

      <Heading>Modes & Sizes</Heading>
      <ChipModesSizesMobile />

      <Heading>Modes & Status</Heading>
      <ChipAllStatuses />

      <Heading>Custom</Heading>
      <ChipCustom />
    </AppScrollView>
  )
}
