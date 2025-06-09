import React, {forwardRef} from 'react'
import {Text as RNText} from 'react-native'

import {TextProps} from '../types'

import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'

/**
 * Text component extension of react-native text with default typography of b2
 */
const Text = (props: TextProps, ref: React.Ref<RNText>) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {typography = 'b3', ...rest} = useMergedProps('Text', props, {
    colors,
    isDark,
  })

  return (
    <RNText
      ref={ref}
      {...rest}
      style={[
        options?.typography?.[typography],
        {color: colors[getStatusColorName(rest?.status, isDark)]},
        rest?.style,
      ]}
    />
  )
}

export default forwardRef(Text)
