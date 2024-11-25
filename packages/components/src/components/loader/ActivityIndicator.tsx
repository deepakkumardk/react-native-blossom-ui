import React, {useCallback} from 'react'
import {
  ActivityIndicator as RNActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'

import {ActivityIndicatorProps} from '../types'

import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {useMergedProps, BlossomSize} from '../../common'
import View from '../view'
import {SizedText} from '../text'

/**
 * An extension of the React Native ActivityIndicator component with extension of visible and label props.
 * This shows the native loader of the platform.
 */
const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const {
    visible = true,
    status = 'primary',
    size = 'medium',
    label,
    labelStyle,
    containerStyle,
    ...rest
  } = useMergedProps('Loader', props)

  const {colors, isDark} = useBlossomTheme()

  const getScale = useCallback(() => {
    if (Platform.OS === 'ios') {
      const scale = (typeof size === 'number' ? size : sizeMap[size]) / 20
      return scale
    }
    return 1
  }, [size])

  const getActivityIndicator = useCallback(() => {
    return (
      <RNActivityIndicator
        color={colors[getStatusColorName(status, isDark)]}
        {...rest}
        size={typeof size === 'number' ? size : sizeMap[size]}
        style={[
          {
            transform: [{scaleX: getScale()}, {scaleY: getScale()}],
          },
          rest.style,
        ]}
      />
    )
  }, [colors, getScale, isDark, rest, size, status])

  return visible ? (
    label ? (
      <View style={[styles.container, containerStyle]}>
        {getActivityIndicator()}
        {label ? (
          <SizedText
            size={typeof size === 'string' ? size : 'medium'}
            style={[styles.label, labelStyle]}>
            {label}
          </SizedText>
        ) : null}
      </View>
    ) : (
      getActivityIndicator()
    )
  ) : null
}

export default ActivityIndicator

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  label: {
    marginTop: 8,
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 20,
  medium: 28,
  large: 36,
}
