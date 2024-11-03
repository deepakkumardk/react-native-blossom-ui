import React, {forwardRef} from 'react'
import {View as RNView, ViewProps} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'

const View = (props: ViewProps, ref: React.Ref<RNView>) => {
  const {...rest} = useMergedProps('View', props)

  const {colors} = useBlossomTheme()

  return (
    <RNView
      ref={ref}
      {...rest}
      style={[{backgroundColor: colors.background100}, rest.style]}
    />
  )
}

export default forwardRef(View)
