import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {View} from '@react-native-blossom-ui/components'
import {
  SelectUsage,
  SelectDefaultValue,
  SelectClearable,
  SelectLoading,
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

        <Heading>Default Value</Heading>
        <SelectDefaultValue />

        <Heading>Clearable</Heading>
        <SelectClearable />

        <Heading>Loading</Heading>
        <SelectLoading />

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
