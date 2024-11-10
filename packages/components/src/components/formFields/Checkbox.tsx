import React, {useCallback} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {BlossomSize, CheckboxProps} from '../types'
import {useMergedProps} from '../../common'
import BaseBooleanField from './BaseBooleanField'
import Icon from '../icon'

const Checkbox = (props: CheckboxProps) => {
  const {
    value,
    onValueChange,
    intermediate,
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
    if (intermediate) return 'remove'

    return 'checkmark'

    // return 'square-outline'
  }, [intermediate])

  return (
    <BaseBooleanField status={status} size={size} {...rest}>
      <Pressable
        accessibilityRole="button"
        style={[
          {
            width: sizeMap[size],
            height: sizeMap[size],
            backgroundColor: getBgColor(),
          },
          styles.checkbox,
          style,
        ]}
        onPress={() =>
          !disabled && onValueChange?.(intermediate ? true : !value)
        }>
        {value || intermediate ? (
          <Icon
            name={getIconName()}
            size={sizeMap[size]}
            color={colors.bgLight100}
          />
        ) : null}
      </Pressable>
    </BaseBooleanField>
  )
}

export default Checkbox

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 20,
  medium: 28,
  large: 36,
}
