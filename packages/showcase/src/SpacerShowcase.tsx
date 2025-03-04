import React from 'react'

import {Spacer, Text, View} from '@react-native-blossom-ui/components'

export function SpacerUsage() {
  return (
    <View>
      <Text>Awesome UI</Text>
      <Spacer height={20} />
      <Text>Blossom UI</Text>
    </View>
  )
}

export function SpacerVertical() {
  return (
    <View row>
      <Text>Hello</Text>
      <Spacer width={100} height={50} />
      <Text>World</Text>
    </View>
  )
}

export function SpacerOnBackground() {
  return (
    <View style={{backgroundColor: 'gray'}}>
      <Text>Awesome UI</Text>
      <Spacer height={20} />
      <Text>Blossom UI</Text>
    </View>
  )
}
