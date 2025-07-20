import React from 'react'
import {Platform, Pressable, Modal as RNModal, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import {Surface} from '../view'
import {getAlphaColor} from '../utils'
import {ModalProps} from '../types'

/**
 * Extension of RN Modal component with backdrop at bottom position
 */
const BottomSheet = (props: ModalProps) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    visible,
    onBackdropPress,
    children,
    style,
    backdropStyle,
    contentStyle,
    ...rest
  } = useMergedProps('BottomSheet', props, {colors, isDark})

  return (
    <RNModal
      transparent
      animationType="slide"
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      {...rest}>
      <Pressable
        accessibilityRole="alert"
        style={[
          styles.backdrop,
          {
            backgroundColor: getAlphaColor(colors.bgDark900, 0.1),
          },
          backdropStyle,
        ]}
        onPress={onBackdropPress}>
        {/* NOTE: This is wrapped to skip the touch event inside the content view */}
        <Pressable accessibilityRole="alert">
          <Surface
            accessibilityRole="alert"
            style={[
              styles.content,
              {
                borderRadius: options?.borderRadius,
              },
              contentStyle,
            ]}>
            {children}
          </Surface>
        </Pressable>
      </Pressable>
    </RNModal>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxHeight: 400,
    ...Platform.select({
      web: {
        alignSelf: 'center',
        maxWidth: 500,
        minWidth: 300,
      },
    }),
  },
})
