import React from 'react'

import {
  BottomSheetUsage,
  BottomSheetWithScroll,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function BottomSheetScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <BottomSheetUsage />

      <Heading>With Scroll</Heading>
      <BottomSheetWithScroll />
    </AppScrollView>
  )
}
