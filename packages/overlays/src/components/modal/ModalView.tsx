import React from 'react'
import {Platform, StyleSheet} from 'react-native'

import {
  useMergedProps,
  useBlossomTheme,
  Surface,
} from '@react-native-blossom-ui/components'
import {ModalProps} from './types'

function ModalView(props: Pick<ModalProps, 'children' | 'containerStyle'>) {
  const {colors, isDark} = useBlossomTheme()

  const {children, containerStyle} = useMergedProps('ModalView', props, {
    colors,
    isDark,
  })

  return (
    <Surface style={[styles.container, containerStyle]}>{children}</Surface>
  )
}

export default ModalView

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 16,
    margin: 24,

    ...Platform.select({
      web: {
        maxWidth: 600,
        minWidth: 300,
      },
    }),
  },
})
