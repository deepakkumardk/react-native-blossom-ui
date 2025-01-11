import React from 'react'

import {View, Divider} from '@react-native-blossom-ui/components'

export function DividerUsage() {
  return (
    <View>
      <Divider />
    </View>
  )
}

export function DividerVertical() {
  return (
    <View>
      <Divider width={1} height={200} />
    </View>
  )
}
