import React from 'react'

import {ModalUsage, ModalWithScroll} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function ModalScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ModalUsage />

      <Heading>With Scroll</Heading>
      <ModalWithScroll />
    </AppScrollView>
  )
}
