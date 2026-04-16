import React from 'react'

import {BottomSheetOverlayUsage} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function BottomSheetScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <BottomSheetOverlayUsage />
    </AppScrollView>
  )
}
