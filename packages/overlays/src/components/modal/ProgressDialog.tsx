import React from 'react'
import {StyleSheet} from 'react-native'

import {
  ActivityIndicator,
  Surface,
  Text,
  useBlossomTheme,
  useMergedProps,
  View,
} from '@react-native-blossom-ui/components'

import Modal from './Modal'
import {ProgressDialogProps} from './types'

function ProgressDialog(props: ProgressDialogProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    visible,
    backdropBehavior = 'block',
    label = 'Loading...',
    labelStyle,
    activityIndicatorProps,
    ...rest
  } = useMergedProps('ProgressDialog', props, {
    colors,
    isDark,
  })

  return (
    <Modal visible={!!visible} backdropBehavior={backdropBehavior} {...rest}>
      <Surface row style={styles.outerContainer}>
        <View row style={styles.innerContainer}>
          <ActivityIndicator {...activityIndicatorProps} />
          {label ? <Text style={labelStyle}>{label}</Text> : null}
        </View>
      </Surface>
    </Modal>
  )
}

export default ProgressDialog

const styles = StyleSheet.create({
  outerContainer: {
    padding: 16,
  },
  innerContainer: {
    gap: 16,
    width: '100%',
    alignItems: 'center',
  },
})
