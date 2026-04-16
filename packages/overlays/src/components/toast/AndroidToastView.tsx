import React from 'react'
import {StyleSheet} from 'react-native'
import {
  View,
  Text,
  useMergedProps,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'
import {AndroidToastViewProps} from './types'

function AndroidToastView(props: AndroidToastViewProps) {
  const {colors, isDark} = useBlossomTheme()

  const {message, description} = useMergedProps('AndroidToastView', props, {
    colors,
    isDark,
  })

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background200,
        },
      ]}>
      <Text>{message}</Text>
      {description && <Text typography="l3">{description}</Text>}
    </View>
  )
}

export default AndroidToastView

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
  },
})
