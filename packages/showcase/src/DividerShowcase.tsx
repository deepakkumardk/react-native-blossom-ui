import React from 'react'

import {View, Divider, Text} from '@react-native-blossom-ui/components'

export function DividerUsage() {
  return (
    <View>
      <Divider />
    </View>
  )
}

export function DividerLabel() {
  return (
    <View>
      <Divider label="Left" labelPosition="left" />
      <Divider label="Center" labelPosition="center" />
      <Divider label="Right" labelPosition="right" />
      <Divider>
        <Text status="error">Danger Area</Text>
      </Divider>
    </View>
  )
}

export function DividerVertical() {
  return (
    <View>
      <Divider width={1} height={50} />
    </View>
  )
}

export function DividerCustom() {
  return (
    <View>
      <Divider width={200} height={10} />
    </View>
  )
}
