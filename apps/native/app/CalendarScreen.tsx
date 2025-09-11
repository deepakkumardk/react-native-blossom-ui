import React from 'react'
import {CalendarUsage} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function DatePickerScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <CalendarUsage />
    </AppScrollView>
  )
}
