import React from 'react'

import {
  LoadingOverlayUsage,
  LoadingOverlayCustom,
} from '@react-native-blossom-ui/showcase'
import {Text} from '@react-native-blossom-ui/components'
import {Heading, AppScrollView} from '../components'

export default function LoadingOverlayScreen() {
  return (
    <AppScrollView>
      <Text>
        Below examples will be auto dismissed after a few seconds for demo
        purposes.
      </Text>
      <Heading>Usage</Heading>
      <LoadingOverlayUsage />

      <Heading>Custom</Heading>
      <LoadingOverlayCustom />
    </AppScrollView>
  )
}
