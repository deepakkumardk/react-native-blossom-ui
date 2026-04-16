import React from 'react'
import {StyleSheet} from 'react-native'

import {
  ActivityIndicator,
  useBlossomTheme,
  useMergedProps,
} from '@react-native-blossom-ui/components'

import Modal from './Modal'
import {LoadingOverlayProps} from './types'

function LoadingOverlay(props: LoadingOverlayProps) {
  const {colors, isDark} = useBlossomTheme()

  const {visible, backdropStyle, ...rest} = useMergedProps(
    'LoadingOverlay',
    props,
    {
      colors,
      isDark,
    },
  )

  return (
    <Modal
      visible={!!visible}
      backdropBehavior="block"
      backdropStyle={backdropStyle}
      style={styles.modal}>
      <ActivityIndicator {...rest} />
    </Modal>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
  },
})
