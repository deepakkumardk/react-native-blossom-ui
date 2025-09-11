import React from 'react'

import {
  IconSizes,
  IconStatuses,
  IconUsage,
  IconFamily,
  IconButton,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function IconScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <IconUsage />

      <Heading>Status</Heading>
      <IconStatuses />

      <Heading>Size</Heading>
      <IconSizes />

      <Heading>Family</Heading>
      <IconFamily />

      <Heading>As Button</Heading>
      <IconButton />
    </AppScrollView>
  )
}
