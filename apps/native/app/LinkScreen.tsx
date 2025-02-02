import React from 'react'
import {StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  LinkUsage,
  LinkWithText,
  LinkCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function LinkScreen() {
  return (
    <View style={styles.container}>
      <Heading>Usage</Heading>
      <LinkUsage />

      <Heading>With Text</Heading>
      <LinkWithText />

      <Heading>Custom</Heading>
      <LinkCustom />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
