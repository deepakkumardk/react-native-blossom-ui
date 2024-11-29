import React from 'react'

import {Text, View} from '@react-native-blossom-ui/components'
import {TYPOGRAPHY_LIST} from './constants'

export function TextUsage() {
  return (
    <View>
      <Text>I am the default font size default to b2</Text>
      <Text typography="s1">I am s1</Text>
    </View>
  )
}

export function TextTypographyAll() {
  return (
    <View>
      {TYPOGRAPHY_LIST.map((value) => (
        <Text key={value} typography={value}>
          This is {value} Text
        </Text>
      ))}
    </View>
  )
}

export function TextStatuses() {
  return (
    <View>
      <Text status="primary">This is text with primary status</Text>
      <Text status="accent">This is text with accent status</Text>
      <Text status="success">This is text with success status</Text>
      <Text status="info">This is text with info status</Text>
      <Text status="warning">This is text with warning status</Text>
      <Text status="error">This is text with error status</Text>
    </View>
  )
}

export function TextCustom() {
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          color: 'green',
        }}>
        This is Long text with font size
      </Text>
    </View>
  )
}
