import React from 'react'
import {StyleSheet} from 'react-native'

import {getBorderColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {BaseBooleanFieldProps} from '../types'
import {View} from '../view'
import SizedText from '../text/SizedText'

/**
 * Centralized component to have blueprint of boolean based fields
 */
const BaseBooleanField = (props: BaseBooleanFieldProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    label,
    caption,
    error,
    disabled,
    position = 'left',
    adjacent = true,
    containerStyle,
    labelStyle,
    captionStyle,
    errorStyle,
    status = 'accent',
    size = 'medium',
    children,
  } = props

  return (
    <View
      style={[
        styles.outerContainer,
        position === 'right' ? styles.positionRight : {},
        adjacent && styles.adjacent,
        containerStyle,
      ]}>
      {children}

      <View
        style={[
          {borderColor: colors[getBorderColorName(status, isDark)]},
          position === 'right' || !adjacent ? styles.alignEndRightPosition : {},
          position === 'right' && !adjacent && styles.alignLeftRightPosition,
          position === 'left' ? styles.startMargin : styles.endMargin,
          containerStyle,
        ]}>
        {label ? (
          <SizedText
            size={size}
            style={[
              styles.label,
              disabled && {
                color: colors.text400,
              },
              labelStyle,
            ]}>
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
    </View>
  )
}

export default BaseBooleanField

const styles = StyleSheet.create({
  alignLeftRightPosition: {
    alignItems: undefined,
  },
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  alignEndRightPosition: {
    alignItems: 'flex-end',
  },
  positionRight: {
    flexDirection: 'row-reverse',
  },
  adjacent: {
    justifyContent: undefined,
  },
  label: {
    fontWeight: '500',
  },
  startMargin: {
    marginStart: 12,
  },
  endMargin: {
    marginEnd: 12,
  },
})
