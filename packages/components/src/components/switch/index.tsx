import React, {forwardRef, useCallback} from 'react'
import {Switch as RNSwitch, StyleSheet} from 'react-native'

import {getBorderColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {SwitchProps} from '../types'
import View from '../view'
import SizedText from '../text/SizedText'

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
    status = 'primary',
    size = 'medium',
    ...rest
  } = props

  const {colors, isDark} = useBlossomTheme()

  const getScale = useCallback(() => {
    if (size === 'small') {
      return 0.75
    }
    if (size === 'large') {
      return 1.25
    }
    return 1
  }, [size])

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
          {transform: [{scaleX: getScale()}, {scaleY: getScale()}]},
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
