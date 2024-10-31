import React, {forwardRef} from 'react'
import {View as RNView, ViewProps} from 'react-native'

import {useBlossomTheme} from '../../context'

const View = (props: ViewProps, ref: React.Ref<RNView>) => {
  const {...rest} = props

  const {colors} = useBlossomTheme()

  return (
    <RNView
      {...rest}
      style={[{backgroundColor: colors.background100}, rest.style]}
    />
  )
}

export default forwardRef(View)
