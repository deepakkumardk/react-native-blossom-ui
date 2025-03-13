import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  IconSizes,
  IconStatuses,
  IconUsage,
  IconFamily,
  IconButton,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function IconScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <IconUsage />

        <Heading>Status</Heading>
        <IconStatuses />

        <Heading>Size</Heading>
        <IconSizes />

        <Heading>Family</Heading>
        <IconFamily />

        <Heading>As Button</Heading>
        <IconButton />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
