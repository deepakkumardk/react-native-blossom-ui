import React from 'react'

import {StyleSheet} from 'react-native'
import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import View from './View'
import {SpacerProps} from '../types'

/**
 * Add a spacing with default height of 10 with transparent background
 */
const Spacer = (props: SpacerProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    width,
    height = 10,
    ...rest
  } = useMergedProps('Spacer', props, {colors, isDark})

  return (
    <View {...rest} style={[styles.transparent, {width, height}, rest.style]} />
  )
}

export default Spacer

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
})
