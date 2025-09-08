import React from 'react'

import {
  ButtonUsage,
  ButtonModes,
  ButtonSizes,
  ButtonStatusesMobile,
  ButtonLoading,
  ButtonDisabled,
  ButtonModesSizesMobile,
  ButtonAllStatuses,
  ButtonAllStatusesDisabled,
  ButtonCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function ButtonScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ButtonUsage />

      <Heading>Modes</Heading>
      <ButtonModes />

      <Heading>Sizes</Heading>
      <ButtonSizes />

      <Heading>Statuses</Heading>
      <ButtonStatusesMobile />

      <Heading>Loading</Heading>
      <ButtonLoading />

      <Heading>Disabled</Heading>
      <ButtonDisabled />

      <Heading>Modes & Sizes</Heading>
      <ButtonModesSizesMobile />

      <Heading>Modes & Status</Heading>
      <ButtonAllStatuses />

      <Heading>Modes & Status - Disabled</Heading>
      <ButtonAllStatusesDisabled />

      <Heading>Custom</Heading>
      <ButtonCustom />
    </AppScrollView>
  )
}
