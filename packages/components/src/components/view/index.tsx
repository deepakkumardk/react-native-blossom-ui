import React, {forwardRef} from 'react'
import {View as RNView, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import {ViewProps} from '../types'

const View = (props: ViewProps, ref: React.Ref<RNView>) => {
  const {row, ...rest} = useMergedProps('View', props)

  const {colors} = useBlossomTheme()

  return (
    <RNView
      ref={ref}
      {...rest}
      style={[
        {backgroundColor: colors.background100},
        row && styles.row,
        rest.style,
      ]}
    />
  )
}

export default forwardRef(View)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
})
