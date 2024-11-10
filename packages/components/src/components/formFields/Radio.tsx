import React, {useCallback} from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {BlossomSize, CheckboxProps} from '../types'
import {useMergedProps} from '../../common'
import BaseBooleanField from './BaseBooleanField'

const Radio = (props: CheckboxProps) => {
  const {
    value,
    onValueChange,
    disabled,
    style,
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
    <BaseBooleanField status={status} size={size} {...rest}>
      <MaterialCommunityIcons
        name={getIconName()}
        size={sizeMap[size]}
        {...(!disabled && !value && {onPress: () => onValueChange?.(!value)})}
        color={getBgColor()}
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
