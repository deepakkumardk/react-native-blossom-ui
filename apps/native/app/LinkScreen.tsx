import React from 'react'

import {
  LinkUsage,
  LinkWithText,
  LinkCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function LinkScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <LinkUsage />

      <Heading>With Text</Heading>
      <LinkWithText />

      <Heading>Custom</Heading>
      <LinkCustom />
    </AppScrollView>
  )
}
