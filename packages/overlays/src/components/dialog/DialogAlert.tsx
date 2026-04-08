import React from 'react'

import {
  Button,
  Text,
  useBlossomTheme,
  useMergedProps,
} from '@react-native-blossom-ui/components'
import {DialogProps} from './types'
import {Modal} from '../modal'
import {Dialog} from './composed'

function DialogAlert(props: DialogProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    visible,
    icon,
    title,
    description,
    actions,
    backdropBehavior = 'dismiss',
    backdropStyle,
    containerStyle,
    onDismiss,
  } = useMergedProps('DialogAlert', props, {
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
      {icon && <Dialog.Icon>{icon}</Dialog.Icon>}
      {title && <Dialog.Title>{title}</Dialog.Title>}
      {description && (
        <Dialog.Content>
          <Text>{description}</Text>
        </Dialog.Content>
      )}
      {actions && (
        <Dialog.Actions>
          {actions.map((action, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Button key={index} mode="plain" {...action} />
          ))}
        </Dialog.Actions>
      )}
    </Modal>
  )
}

export default DialogAlert
