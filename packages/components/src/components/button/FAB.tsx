import React from 'react'

import {StyleSheet} from 'react-native'
import {useMergedProps} from '../../common'
import {FABProps} from '../types'
import {useBlossomTheme} from '../../context'
import BaseButton from './BaseButton'

/**
 * A floating button with icon & label support
 */
const FAB = (props: FABProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    icon,
    offsetX = 48,
    offsetY = 48,
    ...rest
  } = useMergedProps('FAB', props, {colors, isDark})

  return (
    <BaseButton
      {...rest}
      left={icon}
      style={[
        styles.absolute,
        {
          right: offsetX,
          bottom: offsetY,
        },
      ]}
    />
  )
}

export default FAB

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
})
