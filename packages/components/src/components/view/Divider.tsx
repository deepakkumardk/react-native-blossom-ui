import React, {useCallback, useMemo} from 'react'
import {View as RNView, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {DividerProps} from '../types'
import {useMergedProps} from '../../common'
import {Text} from '../text'
import View from './View'

/**
 * A divider with label & it's position support
 */
const Divider = (props: DividerProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    width,
    height = 1,
    color = colors.background500,
    spacing = 0,
    label,
    labelPosition = 'center',
    ...rest
  } = useMergedProps('Divider', props, {colors, isDark})

  const lineStyle = useMemo(
    () =>
      StyleSheet.flatten([
        {
          width,
          height,
          backgroundColor: color,
          marginVertical: spacing,
        },
        styles.line,
        rest?.style,
      ]),
    [width, height, color, spacing, rest?.style],
  )

  const renderLine = useCallback(
    () => <RNView {...rest} style={lineStyle} />,
    [lineStyle, rest],
  )

  const renderLabel = useCallback(
    () =>
      label ? (
        <Text style={[styles[labelPosition], {color}]}>{label}</Text>
      ) : (
        rest?.children
      ),
    [color, label, labelPosition, rest?.children],
  )

  if (label || rest?.children)
    return (
      <View row style={styles.container}>
        {/* Left/Center Position */}
        {labelPosition === 'center' && renderLine()}
        {labelPosition !== 'right' && renderLabel()}
        {labelPosition !== 'right' && renderLine()}

        {/* Right Position */}
        {labelPosition === 'right' && renderLine()}
        {labelPosition === 'right' && renderLabel()}
      </View>
    )

  return (
    <RNView
      {...rest}
      style={[
        {
          width,
          height,
          backgroundColor: color,
          marginVertical:
            !width || Number(width) > Number(height) ? spacing : 0,
          marginHorizontal:
            width && Number(height) > Number(width) ? spacing : 0,
        },
        rest?.style,
      ]}
    />
  )
}

export default Divider

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  line: {
    flex: 1,
  },
  left: {
    marginEnd: 8,
  },
  center: {
    marginHorizontal: 8,
  },
  right: {
    marginStart: 8,
  },
})
