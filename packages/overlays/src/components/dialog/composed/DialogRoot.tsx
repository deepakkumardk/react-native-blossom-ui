import React from 'react'

import {
  useBlossomTheme,
  useMergedProps,
} from '@react-native-blossom-ui/components'

import {DialogBaseProps} from '../types'
import {Modal} from '../../modal'

function DialogRoot(props: DialogBaseProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    visible,
    children,
    backdropBehavior = 'dismiss',
    backdropStyle,
    containerStyle,
    onDismiss,
  } = useMergedProps('DialogRoot', props, {
    colors,
    isDark,
  })

  return (
    <Modal
      visible={visible}
      backdropBehavior={backdropBehavior}
      containerStyle={containerStyle}
      backdropStyle={backdropStyle}
      onDismiss={onDismiss}>
      {children}
    </Modal>
  )
}

export default DialogRoot
