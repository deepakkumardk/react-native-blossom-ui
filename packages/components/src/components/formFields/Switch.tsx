import React, {forwardRef, useEffect, useState} from 'react'
import {Platform, Switch as RNSwitch, StyleSheet} from 'react-native'

import {getBorderColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {SwitchProps} from '../types'
import {useMergedProps, BlossomSize} from '../../common'
import BaseBooleanField from './BaseBooleanField'

/**
 * Switch component with form fields support like label, caption error etc.
 */
const Switch = (props: SwitchProps, ref: React.Ref<RNSwitch>) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    value,
    onValueChange,
    defaultValue,
    disabled,
    color,
    style: switchStyle,
    status = 'accent',
    size = 'medium',
    ...rest
  } = useMergedProps('Switch', props, {colors, isDark})

  const isControlled = value !== undefined
  const [fieldValue, setFieldValue] = useState(defaultValue)

  useEffect(() => {
    if (isControlled) {
      setFieldValue(value)
    }
  }, [value, isControlled])

  return (
    <BaseBooleanField status={status} size={size} disabled={disabled} {...rest}>
      <RNSwitch
        ref={ref}
        value={fieldValue}
        trackColor={{
          true: disabled
            ? colors.bgDark100
            : color || colors[getBorderColorName(status, isDark)],
          false: isDark ? colors.background400 : colors.background300,
        }}
        thumbColor={colors.bgLight100}
        {...Platform.select({
          web: {
            activeThumbColor: colors.bgLight100,
          },
        })}
        disabled={disabled}
        ios_backgroundColor={
          isDark ? colors.background400 : colors.background300
        }
        {...rest}
        style={[
          {transform: [{scaleX: sizeMap[size]}, {scaleY: sizeMap[size]}]},
          size === 'small' && styles.sizeSmall,
          size === 'large' && styles.sizeLarge,
          switchStyle,
        ]}
        onValueChange={() => {
          setFieldValue((prev) => {
            void onValueChange?.(!prev)
            return !prev
          })
        }}
      />
    </BaseBooleanField>
  )
}

export default forwardRef(Switch)

const styles = StyleSheet.create({
  sizeSmall: {
    marginHorizontal: -6,
  },
  sizeLarge: {
    marginHorizontal: 6,
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 0.6,
  medium: 0.8,
  large: 1,
}
