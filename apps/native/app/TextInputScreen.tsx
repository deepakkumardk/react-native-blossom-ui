import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'

import {
  TextInputUsage,
  TextInputModes,
  TextInputSizes,
  TextInputStatuses,
  TextInputDisabled,
  TextInputError,
  TextInputDense,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function TextInputScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <TextInputUsage />

        <Heading>Modes</Heading>
        <TextInputModes />

        <Heading>Dense</Heading>
        <TextInputDense />

        <Heading>Sizes</Heading>
        <TextInputSizes />

        <Heading>Disabled</Heading>
        <TextInputDisabled />

        <Heading>Error</Heading>
        <TextInputError />

        <Heading>Statuses</Heading>
        <TextInputStatuses />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 64,
  },
})
