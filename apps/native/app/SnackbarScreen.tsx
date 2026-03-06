import React from 'react'

import {
  SnackbarUsage,
  SnackbarDuration,
  SnackbarPosition,
  SnackbarNumberOfLines,
  SnackbarCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function SnackbarScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <SnackbarUsage />

      <Heading>Duration</Heading>
      <SnackbarDuration />

      <Heading>Position</Heading>
      <SnackbarPosition />

      <Heading>Number of Lines</Heading>
      <SnackbarNumberOfLines />

      <Heading>Number of Lines</Heading>
      <SnackbarNumberOfLines />

      <Heading>Custom</Heading>
      <SnackbarCustom />
    </AppScrollView>
  )
}
