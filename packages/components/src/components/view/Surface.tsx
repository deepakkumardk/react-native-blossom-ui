import React, {forwardRef} from 'react'
import {View as RNView, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import {ViewProps} from '../types'

/**
 * A layer which will have the background100 color
 *
 * NOTE: use View component once you have wrapped your screen with Surface to have the consistent background
 */
const Surface = (props: ViewProps, ref: React.Ref<RNView>) => {
  const {colors, isDark} = useBlossomTheme()

  const {row, ...rest} = useMergedProps('View', props, {colors, isDark})

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

export default forwardRef(Surface)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
})
