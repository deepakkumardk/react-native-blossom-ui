import React from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'

import {
  View,
  useMergedProps,
  useBlossomTheme,
  Surface,
} from '@react-native-blossom-ui/components'
import {BottomSheetProps} from './types'

function BottomSheetView(
  props: Pick<BottomSheetProps, 'children' | 'containerStyle'>,
) {
  const {colors, isDark} = useBlossomTheme()

  const {width: screenWidth} = useWindowDimensions()

  const {children, containerStyle} = useMergedProps('BottomSheetView', props, {
    colors,
    isDark,
  })

  return (
    <View>
      <Surface
        style={[
          styles.container,
          {
            width: screenWidth,
          },
          containerStyle,
        ]}>
        {children}
      </Surface>
    </View>
  )
}

export default BottomSheetView

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 16,
  },
})
