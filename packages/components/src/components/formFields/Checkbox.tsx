import React, {useCallback, useEffect, useState} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {CheckboxProps} from '../types'
import {useMergedProps, BlossomSize} from '../../common'
import BaseBooleanField from './BaseBooleanField'
import {Icon} from '../icon'

const OFFSET_SIZE = 4

/**
 * Checkbox control field component with custom icon support
 */
const Checkbox = (props: CheckboxProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    value,
    onValueChange,
    indeterminate,
    disabled,
    color,
    style,
    checkedIcon,
    uncheckedIcon,
    status = 'accent',
    size = 'medium',
    ...rest
  } = useMergedProps('Checkbox', props, {colors, isDark})

  const [fieldValue, setFieldValue] = useState(value)

  useEffect(() => {
    setFieldValue(value)
  }, [value])

  const getBgColor = useCallback(() => {
    if (disabled) return isDark ? colors.bgDark400 : colors.bgLight400

    if (fieldValue) return color || colors[getStatusColorName(status, isDark)]

    return isDark ? colors.bgDark800 : colors.bgLight200
  }, [disabled, colors, fieldValue, color, status, isDark])

  const getIconName = useCallback(() => {
    if (indeterminate) return 'minus'

    return 'check'
  }, [indeterminate])

  const getIconColor = useCallback(() => {
    if (disabled) return colors.bgDark100

    return colors.bgLight100
  }, [colors, disabled])

  return (
    <BaseBooleanField status={status} size={size} disabled={disabled} {...rest}>
      <Pressable
        accessibilityRole="button"
        style={[
          styles.checkbox,
          !uncheckedIcon && {
            width: sizeMap[size],
            height: sizeMap[size],
            backgroundColor: getBgColor(),
            borderColor: colors.background300,
            borderWidth: fieldValue ? 0 : 1,
          },
          style,
        ]}
        onPress={() => {
          if (disabled) return
          setFieldValue?.(indeterminate ? true : !fieldValue)
          void onValueChange?.(indeterminate ? true : !fieldValue)
        }}>
        {fieldValue || indeterminate
          ? checkedIcon || (
              <Icon
                family="MaterialCommunityIcons"
                name={getIconName()}
                size={sizeMap[size] - OFFSET_SIZE}
                color={getIconColor()}
              />
            )
          : uncheckedIcon}
      </Pressable>
    </BaseBooleanField>
  )
}

export default Checkbox

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 24,
  medium: 30,
  large: 36,
}
