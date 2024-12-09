import React from 'react'
import {StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import {Text} from '../text'
import Button from '../button'
import View from '../view'
import {ModalContentProps} from '../types'

/**
 * A Dialog with title, description & action buttons
 */
const ModalContent = (props: ModalContentProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {title, description, children, actionButtons} = useMergedProps(
    'ModalContent',
    props,
    {
      colors,
      isDark,
    },
  )

  return (
    <View>
      <Text typography="h5">{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
      <View row style={styles.buttonRow}>
        {actionButtons?.map((buttonProps, index) => (
          <Button
            key={buttonProps.title}
            mode={index === 0 ? 'plain' : 'filled'}
            style={styles.button}
            {...buttonProps}
          />
        ))}
      </View>
    </View>
  )
}

export default ModalContent

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
  },
  description: {
    marginVertical: 8,
  },
  buttonRow: {
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
})
