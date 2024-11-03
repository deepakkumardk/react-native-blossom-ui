import React, {forwardRef} from 'react'
import {Switch as RNSwitch, StyleSheet} from 'react-native'

import {getBorderColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {BlossomSize, SwitchProps} from '../types'
import View from '../view'
import SizedText from '../text/SizedText'
import {useMergedProps} from '../../common'

const Switch = (props: SwitchProps, ref: React.Ref<RNSwitch>) => {
  const {
    label,
    caption,
    error = '',
    disabled,
    position = 'right',
    containerStyle,
    style: switchStyle,
    labelStyle,
    captionStyle,
    errorStyle,
    status = 'accent',
    size = 'medium',
    ...rest
  } = useMergedProps('Switch', props)

  const {colors, isDark} = useBlossomTheme()

  return (
    <View
      style={[
        styles.outerContainer,
        position === 'left' ? styles.positionLeft : {},
        containerStyle,
      ]}>
      <View
        style={[
          position === 'left' ? styles.innerContainerLeftPosition : {},
          {borderColor: colors[getBorderColorName(status, isDark)]},
          containerStyle,
        ]}>
        {label ? (
          <SizedText size={size} style={[styles.label, labelStyle]}>
            {label}
          </SizedText>
        ) : null}

        {caption ? (
          <SizedText size={size} mode="caption" style={[captionStyle]}>
            {caption}
          </SizedText>
        ) : null}
        {error ? (
          <SizedText size={size} status="error" style={[errorStyle]}>
            {error}
          </SizedText>
        ) : null}
      </View>

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
    </View>
  )
}

export default forwardRef(Switch)

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainerLeftPosition: {
    alignItems: 'flex-end',
  },
  positionLeft: {
    flexDirection: 'row-reverse',
  },
  label: {
    fontWeight: '500',
  },
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
