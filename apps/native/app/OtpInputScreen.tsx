import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
import {
  OtpInputUsage,
  OtpInputModes,
  OtpInputPlaceholder,
  OtpInputWithCursor,
  OtpInputAsPin,
  OtpInputSizes,
  OtpInputCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function OtpInputScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
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
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
