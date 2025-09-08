import React from 'react'

import {CardUsage} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function CardScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <CardUsage />
    </AppScrollView>
  )
}
