import React from 'react'

import {
  ProgressDialogUsage,
  ProgressDialogLabel,
  ProgressDialogCustom,
} from '@react-native-blossom-ui/showcase'
import {Text} from '@react-native-blossom-ui/components'
import {Heading, AppScrollView} from '../components'

export default function ProgressDialogScreen() {
  return (
    <AppScrollView>
      <Text>
        Below ProgressDialog component will be auto dismissed after 3 seconds of
        being shown for demo purpose.
      </Text>
      <Heading>Usage</Heading>
      <ProgressDialogUsage />

      <Heading>With Label</Heading>
      <ProgressDialogLabel />

      <Heading>Custom</Heading>
      <ProgressDialogCustom />
    </AppScrollView>
  )
}
