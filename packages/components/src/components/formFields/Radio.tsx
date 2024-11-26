import React, {useCallback} from 'react'

import Icon from '../icon'
import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {RadioProps} from '../types'
import {useMergedProps, BlossomSize} from '../../common'
import BaseBooleanField from './BaseBooleanField'

const Radio = (props: RadioProps) => {
  const {
    value,
    onValueChange,
    disabled,
    style,
    color,
    status = 'accent',
    size = 'medium',
    ...rest
  } = useMergedProps('Checkbox', props)

  const {colors, isDark} = useBlossomTheme()

  const getBgColor = useCallback(() => {
    if (disabled) return colors.bgDark100

    return colors[getStatusColorName(status, isDark)]
  }, [disabled, colors, status, isDark])

  const getIconName = useCallback(() => {
    if (value) return 'radiobox-marked'

    return 'radiobox-blank'
  }, [value])

  return (
    <BaseBooleanField status={status} size={size} disabled={disabled} {...rest}>
      <Icon
        family="MaterialCommunityIcons"
        name={getIconName()}
        size={sizeMap[size]}
        {...(!disabled && !value && {onPress: () => onValueChange?.(!value)})}
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
