import React, {forwardRef} from 'react'
import {Switch as RNSwitch, StyleSheet} from 'react-native'

import {getBorderColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {BlossomSize, SwitchProps} from '../types'
import {useMergedProps} from '../../common'
import BaseBooleanField from './BaseBooleanField'

const Switch = (props: SwitchProps, ref: React.Ref<RNSwitch>) => {
  const {
    disabled,
    style: switchStyle,
    status = 'accent',
    size = 'medium',

    ...rest
  } = useMergedProps('Switch', props)

  const {colors, isDark} = useBlossomTheme()

  return (
    <BaseBooleanField status={status} size={size} {...rest}>
      <RNSwitch
        ref={ref}
        trackColor={{
          true: colors[getBorderColorName(status, isDark)],
          false: colors.background900,
        }}
        thumbColor={colors.bgLight100}
        disabled={disabled}
        ios_backgroundColor={
          isDark ? colors.background400 : colors.background300
        }
        {...rest}
        style={[
          {transform: [{scaleX: sizeMap[size]}, {scaleY: sizeMap[size]}]},
          size === 'small'
            ? styles.sizeSmall
            : size === 'large'
              ? styles.sizeLarge
              : {},
          switchStyle,
        ]}
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
  small: 0.75,
  medium: 1,
  large: 1.25,
}
