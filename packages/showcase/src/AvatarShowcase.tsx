import React from 'react'
import {Avatar, AvatarProps, View} from '@react-native-blossom-ui/components'

import {SIZE_LIST} from './constants'

export function AvatarUsage() {
  return (
    <View>
      <Avatar mode="circle" url="https://picsum.photos/200/300?random=1" />
    </View>
  )
}

export function AvatarModes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Avatar mode="circle" url="https://picsum.photos/200/300?random=1" />
      <Avatar mode="round" url="https://picsum.photos/200/300?random=1" />
      <Avatar mode="square" url="https://picsum.photos/200/300?random=1" />
    </View>
  )
}

export function AvatarSizes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Avatar size="small" initials="A" />
      <Avatar size="medium" initials="A" />
      <Avatar size="large" initials="A" />
    </View>
  )
}

export function AvatarStatuses() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Avatar status="primary" initials="AB" />
      <Avatar status="accent" initials="AB" />
      <Avatar status="success" initials="AB" />
      <Avatar status="info" initials="AB" />
      <Avatar status="warning" initials="AB" />
      <Avatar status="error" initials="AB" />
    </View>
  )
}

export function AvatarStatusesSmall() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Avatar status="primary" initials="AB" size="small" />
      <Avatar status="accent" initials="AB" size="small" />
      <Avatar status="success" initials="AB" size="small" />
      <Avatar status="info" initials="AB" size="small" />
      <Avatar status="warning" initials="AB" size="small" />
      <Avatar status="error" initials="AB" size="small" />
    </View>
  )
}

export function AvatarModesSizes() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      {MODES.map((mode) => (
        <View
          key={mode}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginVertical: 6,
          }}>
          {SIZE_LIST.map((size) => (
            <Avatar key={size} mode={mode} size={size} initials="AB" />
          ))}
        </View>
      ))}
    </View>
  )
}

const MODES: AvatarProps['mode'][] = ['circle', 'round', 'square']
