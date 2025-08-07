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
      <Divider spacing={20}>
        <Text status="error">Danger Area</Text>
      </Divider>
    </View>
  )
}

export function DividerSpacing() {
  return (
    <View>
      <Divider spacing={10} />
      <Divider spacing={30} />
    </View>
  )
}

export function DividerVertical() {
  return (
    <View>
      <Divider width={1} height={50} spacing={20} />
    </View>
  )
}

export function DividerCustom() {
  return (
    <View>
      <Divider width={200} height={10} spacing={20} />
    </View>
  )
}
