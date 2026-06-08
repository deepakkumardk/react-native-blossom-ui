import React from 'react'
import {useBlossomTheme, View} from '@react-native-blossom-ui/components'
import {StyleProp, StyleSheet, ViewStyle} from 'react-native'

const ARROW_SIZE = 8

function Triangle({style}: {style?: StyleProp<ViewStyle>}) {
  const {colors} = useBlossomTheme()

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: colors.background500,
        },
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: ARROW_SIZE / 2,
    borderRightWidth: ARROW_SIZE / 2,
    borderBottomWidth: ARROW_SIZE,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
})

export default Triangle
