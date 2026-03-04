import React from 'react'

import {
  ToastUsage,
  ToastDuration,
  ToastPosition,
  ToastStatuses,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function ToastScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ToastUsage />

      <Heading>Duration</Heading>
      <ToastDuration />

      <Heading>Position</Heading>
      <ToastPosition />

      <Heading>Status</Heading>
      <ToastStatuses />
    </AppScrollView>
  )
}
