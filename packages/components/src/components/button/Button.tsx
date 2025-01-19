import React from 'react'

import {useMergedProps} from '../../common'
import {ButtonProps} from '../types'
import {useBlossomTheme} from '../../context'
import BaseButton from './BaseButton'

/**
 * Standard Button component with multiple customizations
 */
const Button = (props: ButtonProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {...rest} = useMergedProps('Button', props, {colors, isDark})

  return <BaseButton {...rest} />
}

export default Button
