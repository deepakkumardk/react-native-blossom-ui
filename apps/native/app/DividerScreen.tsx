import React from 'react'

import {
  DividerCustom,
  DividerLabel,
  DividerSpacing,
  DividerUsage,
  DividerVertical,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function DividerScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <DividerUsage />

      <Heading>Label Positions</Heading>
      <DividerLabel />

      <Heading>Spacing</Heading>
      <DividerSpacing />

      <Heading>Vertical</Heading>
      <DividerVertical />

      <Heading>Custom</Heading>
      <DividerCustom />
    </AppScrollView>
  )
}
