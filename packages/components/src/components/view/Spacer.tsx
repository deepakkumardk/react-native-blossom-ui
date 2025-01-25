import React from 'react'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import View from './View'
import {SpacerProps} from '../types'

const Spacer = (props: SpacerProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    width,
    height = 10,
    ...rest
  } = useMergedProps('Spacer', props, {colors, isDark})

  return <View {...rest} style={[{width, height}, rest.style]} />
}

export default Spacer
