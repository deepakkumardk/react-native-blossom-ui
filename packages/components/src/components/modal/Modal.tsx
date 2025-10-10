import React from 'react'
import {Platform, Pressable, Modal as RNModal, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps, useDeviceInfo} from '../../common'
import {Surface, View} from '../view'
import {getAlphaColor} from '../utils'
import {ModalProps} from '../types'

/**
 * Extension of RN Modal component with backdrop
 */
const Modal = (props: ModalProps) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    visible,
    onBackdropPress,
    children,
    style,
    backdropStyle,
    contentStyle,
    ...rest
  } = useMergedProps('Modal', props, {colors, isDark})

  const {isLandscape} = useDeviceInfo()

  return (
    <RNModal
      transparent
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      {...rest}>
      <Pressable
        accessibilityRole="alert"
        style={[
          styles.backdrop,
          {
            backgroundColor: getAlphaColor(colors.bgDark900, 0.65),
          },
          backdropStyle,
        ]}
        onPress={onBackdropPress}
      />
      <View style={styles.contentContainer}>
        <Surface
          accessibilityRole="alert"
          style={[
            styles.content,
            // styles.contentContainer,
            isLandscape && styles.landscape,
            {
              borderRadius: options?.borderRadius,
            },
            contentStyle,
          ]}>
          {children}
        </Surface>
      </View>
    </RNModal>
  )
}

export default Modal

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    marginHorizontal: 24,
    marginVertical: 48,

    ...Platform.select({
      web: {
        alignSelf: 'center',
        maxWidth: 600,
        minWidth: 300,
      },
    }),
  },
  landscape: {
    marginHorizontal: '25%',
  },
})
