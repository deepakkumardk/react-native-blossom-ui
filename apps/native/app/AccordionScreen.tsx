import React from 'react'

import {
  AccordionUsage,
  AccordionCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function AccordionScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <AccordionUsage />

      <Heading>Custom</Heading>
      <AccordionCustom />
    </AppScrollView>
  )
}
