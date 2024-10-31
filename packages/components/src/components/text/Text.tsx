import React, {forwardRef} from 'react'
import {Text as RNText} from 'react-native'

import {TextProps} from '../types'
import {typographyStyle} from './typography'
import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'

/**
 * Text component extension of react-native text with default typography of b2
 */
const Text = (props: TextProps, ref: React.Ref<RNText>) => {
  const {typography = 'b2', ...rest} = props

  const {colors, isDark} = useBlossomTheme()

  return (
    <RNText
      ref={ref}
      {...rest}
      style={[
        typographyStyle[typography],
        {color: colors[getStatusColorName(rest?.status, isDark)]},
        rest?.style,
      ]}
    />
  )
}

export default forwardRef(Text)
