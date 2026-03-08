import React from 'react'

import {
  ActionSheetUsage,
  ActionSheetCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function ActionSheetScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ActionSheetUsage />

      <Heading>Custom</Heading>
      <ActionSheetCustom />
    </AppScrollView>
  )
}
