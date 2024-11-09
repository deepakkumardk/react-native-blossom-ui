import React from 'react'
import {StyleSheet} from 'react-native'

import {getBorderColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {BaseBooleanFieldProps} from '../types'
import View from '../view'
import SizedText from '../text/SizedText'

const BaseBooleanField = (props: BaseBooleanFieldProps) => {
  const {
    label,
    caption,
    error,
    position = 'right',
    containerStyle,
    labelStyle,
    captionStyle,
    errorStyle,
    status = 'accent',
    size = 'medium',
    children,
  } = props

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

      {children}
    </View>
  )
}

export default BaseBooleanField

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
})
