import React from 'react'
import {StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  IconSizes,
  IconStatuses,
  IconUsage,
  IconFamily,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function IconScreen() {
  return (
    <View style={styles.container}>
      <Heading>Usage</Heading>
      <IconUsage />

      <Heading>Status</Heading>
      <IconStatuses />

      <Heading>Size</Heading>
      <IconSizes />

      <Heading>Family</Heading>
      <IconFamily />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
