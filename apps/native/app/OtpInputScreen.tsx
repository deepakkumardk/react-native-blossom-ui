import React from 'react'

import {
  OtpInputUsage,
  OtpInputModes,
  OtpInputPlaceholder,
  OtpInputWithCursor,
  OtpInputAsPin,
  OtpInputSizes,
  OtpInputCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function OtpInputScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <OtpInputUsage />

      <Heading>Modes</Heading>
      <OtpInputModes />

      <Heading>Placeholder</Heading>
      <OtpInputPlaceholder />

      <Heading>With Cursor</Heading>
      <OtpInputWithCursor />

      <Heading>As PIN</Heading>
      <OtpInputAsPin />

      <Heading>Size</Heading>
      <OtpInputSizes />

      <Heading>Custom</Heading>
      <OtpInputCustom />
    </AppScrollView>
  )
}
