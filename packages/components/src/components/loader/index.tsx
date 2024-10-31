import React, {useCallback} from 'react'
import {ActivityIndicator, Platform} from 'react-native'

import {BlossomSize, LoaderProps} from '../types'

import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'

const newSize: Record<BlossomSize, number> = {
  small: 20,
  medium: 28,
  large: 36,
}

const Loader = (props: LoaderProps) => {
  const {visible = true, status = 'primary', size = 'medium', ...rest} = props

  const {colors, isDark} = useBlossomTheme()

  const getScale = useCallback(() => {
    if (Platform.OS === 'ios') {
      const scale = (typeof size === 'number' ? size : newSize[size]) / 20
      console.log('getScale -> scale', scale)
      return scale
    }
    return 1
  }, [size])

  return visible ? (
    <ActivityIndicator
      {...rest}
      color={rest.color || colors[getStatusColorName(status, isDark)]}
      size={
        // Platform.OS === 'android'
        //   ?
        typeof size === 'number' ? size : newSize[size]
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

export default Loader
