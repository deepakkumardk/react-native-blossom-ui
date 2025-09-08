import React from 'react'

import {
  SearchInputUsage,
  SearchInputModes,
  SearchInputSizes,
  SearchInputDense,
  AnimatedSearchInput,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function SearchInputScreen() {
  return (
    <AppScrollView>
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
    </AppScrollView>
  )
}
