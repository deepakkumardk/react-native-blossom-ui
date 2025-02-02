import React from 'react'
import {StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  OtpInputUsage,
  OtpInputModes,
  OtpInputPlaceholder,
  OtpInputSizes,
  OtpInputCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function OtpInputScreen() {
  return (
    <View style={styles.container}>
      <Heading>Usage</Heading>
      <OtpInputUsage />

      <Heading>Modes</Heading>
      <OtpInputModes />

      <Heading>Placeholder</Heading>
      <OtpInputPlaceholder />

      <Heading>Size</Heading>
      <OtpInputSizes />

      <Heading>Custom</Heading>
      <OtpInputCustom />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
