import React, {useCallback} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {CheckboxProps} from '../types'
import {useMergedProps, BlossomSize} from '../../common'
import BaseBooleanField from './BaseBooleanField'
import Icon from '../icon'

const Checkbox = (props: CheckboxProps) => {
  const {
    value,
    onValueChange,
    indeterminate,
    disabled,
    color,
    style,
    status = 'accent',
    size = 'medium',
    ...rest
  } = useMergedProps('Checkbox', props)

  const {colors, isDark} = useBlossomTheme()

  const getBgColor = useCallback(() => {
    if (disabled) return isDark ? colors.bgDark400 : colors.bgLight400

    if (value) return color || colors[getStatusColorName(status, isDark)]

    return isDark ? colors.bgDark800 : colors.bgLight200
  }, [disabled, colors, value, color, status, isDark])

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
          {
            width: sizeMap[size],
            height: sizeMap[size],
            backgroundColor: getBgColor(),
            borderColor: colors.background300,
            borderWidth: value ? 0 : 1,
          },
          styles.checkbox,
          style,
        ]}
        onPress={() =>
          !disabled && onValueChange?.(indeterminate ? true : !value)
        }>
        {value || indeterminate ? (
          <Icon
            family="MaterialCommunityIcons"
            name={getIconName()}
            size={sizeMap[size] - 4}
            color={getIconColor()}
          />
        ) : null}
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
