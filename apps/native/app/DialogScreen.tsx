import React from 'react'

import {
  DialogComposedUsage,
  DialogAlertUsage,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function DialogScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <DialogAlertUsage />

      <Heading>Composed Component Usage</Heading>
      <DialogComposedUsage />
    </AppScrollView>
  )
}
