import React from 'react'
import {Platform, StyleSheet} from 'react-native'

import {
  useMergedProps,
  useBlossomTheme,
  Surface,
} from '@react-native-blossom-ui/components'
import {ModalProps} from './types'

function ModalView(props: Pick<ModalProps, 'children' | 'style'>) {
  const {colors, isDark} = useBlossomTheme()

  const {children, style} = useMergedProps('ModalView', props, {
    colors,
    isDark,
  })

  return <Surface style={[styles.container, style]}>{children}</Surface>
}

export default ModalView

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    borderRadius: 14,
    padding: 16,
    maxWidth: '100%',

    ...Platform.select({
      web: {
        maxWidth: 600,
        minWidth: 300,
      },
    }),
  },
})
