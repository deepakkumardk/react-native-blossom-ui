import React from 'react'

import {ModalOverlayUsage} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function ModalScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ModalOverlayUsage />
    </AppScrollView>
  )
}
