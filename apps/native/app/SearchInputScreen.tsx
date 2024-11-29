import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'

import {
  SearchInputUsage,
  SearchInputModes,
  SearchInputSizes,
  SearchInputDense,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function SearchInputScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <SearchInputUsage />

        <Heading>Modes</Heading>
        <SearchInputModes />

        <Heading>Dense</Heading>
        <SearchInputDense />

        <Heading>Sizes</Heading>
        <SearchInputSizes />
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
