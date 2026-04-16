import React from 'react'

import {
  DialogAlertUsage,
  DialogWithoutIcon,
  DialogSingleAction,
  DialogBlockBackdrop,
  DialogComposedUsage,
  DialogComposedWithForm,
  DialogComposedCustomStyle,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function DialogScreen() {
  return (
    <AppScrollView>
      <Heading>Dialog.Alert - Basic Usage</Heading>
      <DialogAlertUsage />

      <Heading>Without Icon</Heading>
      <DialogWithoutIcon />

      <Heading>Single Action</Heading>
      <DialogSingleAction />

      <Heading>Block Backdrop</Heading>
      <DialogBlockBackdrop />

      <Heading>Dialog.Root - Composed Usage</Heading>
      <DialogComposedUsage />

      <Heading>Composed with Form</Heading>
      <DialogComposedWithForm />

      <Heading>Custom Styled Dialog</Heading>
      <DialogComposedCustomStyle />
    </AppScrollView>
  )
}
