import React from 'react'
import {ProgressBar, View} from '@react-native-blossom-ui/components'

export function ProgressBarUsage() {
  return (
    <View>
      <ProgressBar value={60} />
    </View>
  )
}

export function ProgressBarIndeterminate() {
  return <ProgressBar indeterminate />
}

export function ProgressBarDirection() {
  return (
    <View>
      <ProgressBar indeterminate reverseDirection />
      <ProgressBar reverseDirection value={60} />
    </View>
  )
}

export function ProgressBarSizes() {
  return (
    <View>
      <ProgressBar value={10} size="small" />
      <ProgressBar value={20} size="medium" />
      <ProgressBar value={30} size="large" />
    </View>
  )
}

export function ProgressBarStatuses() {
  return (
    <View>
      <ProgressBar value={10} />
      <ProgressBar value={20} status="accent" />
      <ProgressBar value={30} status="success" />
      <ProgressBar value={40} status="info" />
      <ProgressBar value={50} status="warning" />
      <ProgressBar value={60} status="error" />
    </View>
  )
}

export function ProgressBarCustom() {
  return (
    <View>
      <ProgressBar indeterminate value={50} color="blue" trackColor="cyan" />
      <ProgressBar value={20} color="red" trackColor="green" height={20} />
    </View>
  )
}
