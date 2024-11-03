import React, {useCallback} from 'react'
import {ActivityIndicator as RNActivityIndicator, Platform} from 'react-native'

import {BlossomSize, ActivityIndicatorProps} from '../types'

import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'

const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const {
    visible = true,
    status = 'primary',
    size = 'medium',
    ...rest
  } = useMergedProps('Loader', props)

  const {colors, isDark} = useBlossomTheme()

  const getScale = useCallback(() => {
    if (Platform.OS === 'ios') {
      const scale = (typeof size === 'number' ? size : sizeMap[size]) / 20
      return scale
    }
    return 1
  }, [size])

  return visible ? (
    <RNActivityIndicator
      {...rest}
      color={rest.color || colors[getStatusColorName(status, isDark)]}
      size={
        // Platform.OS === 'android'
        //   ?
        typeof size === 'number' ? size : sizeMap[size]
        // : 'small'
      }
      style={[
        {
          transform: [{scaleX: getScale()}, {scaleY: getScale()}],
          padding: 6,
        },
        rest.style,
      ]}
    />
  ) : null
}

export default ActivityIndicator

const sizeMap: Record<BlossomSize, number> = {
  small: 20,
  medium: 28,
  large: 36,
}
