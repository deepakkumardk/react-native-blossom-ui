import React from 'react'

import {
  SpacerOnBackground,
  SpacerUsage,
  SpacerVertical,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function SpacerScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <SpacerUsage />

      <Heading>Horizontal Spacing</Heading>
      <SpacerVertical />

      <Heading>On Background</Heading>
      <SpacerOnBackground />
    </AppScrollView>
  )
}
