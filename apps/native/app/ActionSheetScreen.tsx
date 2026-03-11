import React from 'react'

import {
  ActionSheetUsage,
  ActionSheetCustom,
  ActionSheetIosFeel,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function ActionSheetScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ActionSheetUsage />

      <Heading>iOS Feel</Heading>
      <ActionSheetIosFeel />

      <Heading>Custom</Heading>
      <ActionSheetCustom />
    </AppScrollView>
  )
}
