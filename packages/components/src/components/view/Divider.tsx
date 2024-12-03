import React, {forwardRef} from 'react'
import {View as RNView} from 'react-native'

import {useBlossomTheme} from '../../context'
import {DividerProps} from '../types'
import {useMergedProps} from '../../common'

const Divider = (props: DividerProps, ref: React.Ref<RNView>) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    width = '100%',
    height = 0.6,
    color,
    ...rest
  } = useMergedProps('Divider', props, {colors, isDark})

  return (
    <RNView
      ref={ref}
      {...rest}
      style={[
        {
          width,
          height,
          backgroundColor: color || colors.background900,
        },
        rest.style,
      ]}
    />
  )
}

export default forwardRef(Divider)
