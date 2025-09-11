import React from 'react'

import {
  TextTypographyAll,
  TextUsage,
  TextStatuses,
  TextCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function TextScreen() {
  return (
    <AppScrollView>
      <Heading>All</Heading>
      <TextTypographyAll />

      <Heading>Usage</Heading>
      <TextUsage />

      <Heading>Status</Heading>
      <TextStatuses />

      <Heading>Custom</Heading>
      <TextCustom />
    </AppScrollView>
  )
}
