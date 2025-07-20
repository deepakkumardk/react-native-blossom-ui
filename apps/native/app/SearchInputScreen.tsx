import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'

import {
  SearchInputUsage,
  SearchInputModes,
  SearchInputSizes,
  SearchInputDense,
  AnimatedSearchInput,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function SearchInputScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <SearchInputUsage />

        <Heading>Animated Placeholder</Heading>
        <AnimatedSearchInput />

        <Heading>Modes</Heading>
        <SearchInputModes />

        <Heading>Dense</Heading>
        <SearchInputDense />

        <Heading>Sizes</Heading>
        <SearchInputSizes />
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 64,
  },
})
