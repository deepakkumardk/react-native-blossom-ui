import React from 'react'

import {View, ActivityIndicator} from '@react-native-blossom-ui/components'

export function ActivityIndicatorUsage() {
  return (
    <View>
      <ActivityIndicator />
    </View>
  )
}

export function ActivityIndicatorStatuses() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <ActivityIndicator status="primary" />
      <ActivityIndicator status="accent" />
      <ActivityIndicator status="success" />
      <ActivityIndicator status="info" />
      <ActivityIndicator status="warning" />
      <ActivityIndicator status="error" />
    </View>
  )
}

export function ActivityIndicatorSizes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <ActivityIndicator size="small" label="small" />
      <ActivityIndicator size="medium" label="medium" />
      <ActivityIndicator size="large" label="large" />
    </View>
  )
}

export function ActivityIndicatorCustom() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <ActivityIndicator color="green" size={40} label="Loading..." />
      <ActivityIndicator
        color="cyan"
        size={80}
        label="Fetching your data..."
        labelStyle={{fontSize: 18}}
      />
    </View>
  )
}
