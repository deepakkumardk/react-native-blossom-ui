import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {IconProps} from '../types'
import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'

/**
 * Icon component defaulted to Ionicons
 */
const Icon = (props: IconProps) => {
  const {status, ...rest} = useMergedProps('Icon', props)

  const {colors, isDark} = useBlossomTheme()

  return (
    <Ionicons color={colors[getStatusColorName(status, isDark)]} {...rest} />
  )
}

export default Icon
