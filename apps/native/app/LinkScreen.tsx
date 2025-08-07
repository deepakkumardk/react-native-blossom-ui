import React from 'react'
import {StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
import {
  LinkUsage,
  LinkWithText,
  LinkCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function LinkScreen() {
  return (
    <Surface style={styles.container}>
      <Heading>Usage</Heading>
      <LinkUsage />

      <Heading>With Text</Heading>
      <LinkWithText />

      <Heading>Custom</Heading>
      <LinkCustom />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
