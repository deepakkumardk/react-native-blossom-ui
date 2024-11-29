import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  TextTypographyAll,
  TextUsage,
  TextStatuses,
  TextCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function TextScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>All</Heading>
        <TextTypographyAll />

        <Heading>Usage</Heading>
        <TextUsage />

        <Heading>Status</Heading>
        <TextStatuses />

        <Heading>Custom</Heading>
        <TextCustom />
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
