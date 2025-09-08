import React from 'react'

import {
  TooltipUsage,
  TooltipAtEdge,
  TooltipCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function TooltipScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <TooltipUsage />

      <Heading>At Edge</Heading>
      <TooltipAtEdge />

      <Heading>Custom</Heading>
      <TooltipCustom />
    </AppScrollView>
  )
}
