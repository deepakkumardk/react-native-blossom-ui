import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {View} from '@react-native-blossom-ui/components'
import {
  SelectUsage,
  SelectClearable,
  SelectDisabled,
  SelectObjectOptions,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function SelectScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <SelectUsage />

        <Heading>Clearable</Heading>
        <SelectClearable />

        <Heading>Disabled</Heading>
        <SelectDisabled />

        <Heading>Object List Options</Heading>
        <SelectObjectOptions />
      </ScrollView>
      <Heading>Auto Top Position</Heading>
      <SelectUsage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
