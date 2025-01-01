import React from 'react'
import {Platform, Pressable, Modal as RNModal, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import View from '../view'
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

  return (
    <RNModal transparent visible={visible} {...rest}>
      <Pressable
        accessibilityRole="alert"
        style={[
          styles.backdrop,
          {
            backgroundColor: getAlphaColor(colors.bgDark900, 0.65),
          },
          backdropStyle,
        ]}
        onPress={onBackdropPress}>
        {/* NOTE: This is wrapped to skip the touch event inside the content view */}
        <Pressable accessibilityRole="alert">
          <View
            accessibilityRole="alert"
            style={[
              styles.content,
              {
                borderRadius: options?.borderRadius,
              },
              contentStyle,
            ]}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  )
}

export default Modal

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    margin: 24,
    padding: 16,
    borderRadius: 8,
    ...Platform.select({
      web: {
        alignSelf: 'center',
        maxWidth: 500,
        minWidth: 300,
      },
    }),
  },
})
