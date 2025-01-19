import React, {useCallback, useEffect, useState} from 'react'

import {Icon} from '../icon'
import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {RadioProps} from '../types'
import {useMergedProps, BlossomSize} from '../../common'
import BaseBooleanField from './BaseBooleanField'

/**
 * Custom Radio component built from vector icons
 */
const Radio = (props: RadioProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    value,
    onValueChange,
    disabled,
    style,
    color,
    status = 'accent',
    size = 'medium',
    ...rest
  } = useMergedProps('Radio', props, {colors, isDark})

  const [fieldValue, setFieldValue] = useState(value)

  useEffect(() => {
    setFieldValue(value)
  }, [value])

  const getBgColor = useCallback(() => {
    if (disabled) return colors.bgDark100

    return colors[getStatusColorName(status, isDark)]
  }, [disabled, colors, status, isDark])

  const getIconName = useCallback(() => {
    if (fieldValue) return 'radiobox-marked'

    return 'radiobox-blank'
  }, [fieldValue])

  return (
    <BaseBooleanField status={status} size={size} disabled={disabled} {...rest}>
      <Icon
        family="MaterialCommunityIcons"
        name={getIconName()}
        size={sizeMap[size]}
        onPress={
          fieldValue || disabled
            ? undefined
            : () => {
                setFieldValue(true)
                void onValueChange?.(true)
              }
        }
        color={color || getBgColor()}
      />
    </BaseBooleanField>
  )
}

export default Radio

const sizeMap: Record<BlossomSize, number> = {
  small: 20,
  medium: 28,
  large: 36,
}
