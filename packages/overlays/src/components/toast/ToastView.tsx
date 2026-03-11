/* eslint-disable react/no-unused-prop-types */
import React, {useCallback} from 'react'
import {StyleSheet} from 'react-native'

import {
  View,
  Text,
  Icon,
  useMergedProps,
  useBlossomTheme,
  BlossomThemeColors,
} from '@react-native-blossom-ui/components'
import AndroidToastView from './AndroidToastView'
import {ToastStatus, ToastViewProps} from './types'

function ToastView(props: ToastViewProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    message,
    description,
    status = 'default',
    shouldUseNativeAndroidToast,
  } = useMergedProps('ToastView', props, {
    colors,
    isDark,
  })

  const getStatusIcon = useCallback(() => {
    const statusIconMap: Record<ToastStatus, string> = {
      default: '',
      info: 'information-circle',
      success: 'checkmark-circle',
      warning: 'warning',
      error: 'close-circle',
    }

    if (status) {
      return statusIconMap[status]
    }

    return ''
  }, [status])

  if (shouldUseNativeAndroidToast) {
    return <AndroidToastView message={message} description={description} />
  }

  return (
    <View
      row
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.bgDark900 : colors.bgLight100,
        },
      ]}>
      {getStatusIcon() && (
        <Icon
          family="Ionicons"
          name={getStatusIcon()}
          color={getStatusColor(status, colors)}
          size={28}
        />
      )}
      <View>
        <Text typography="s3">{message}</Text>
        {description && (
          <Text typography="l3" style={{color: colors.text200}}>
            {description}
          </Text>
        )}
      </View>
    </View>
  )
}

export default ToastView

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
})

const getStatusColor = (status: ToastStatus, colors: BlossomThemeColors) => {
  const statusColorMap: Record<ToastStatus, string> = {
    default: '',
    info: colors.info500,
    success: colors.success500,
    warning: colors.warning500,
    error: colors.error500,
  }

  return statusColorMap[status]
}
