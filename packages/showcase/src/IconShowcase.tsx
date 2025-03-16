import React from 'react'

import {View, Icon} from '@react-native-blossom-ui/components'

export function IconUsage() {
  return (
    <View>
      <Icon name="add" size={24} />
    </View>
  )
}

export function IconStatuses() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Icon status="primary" name="add" size={24} />
      <Icon status="accent" name="add" size={24} />
      <Icon status="success" name="add" size={24} />
      <Icon status="info" name="add" size={24} />
      <Icon status="warning" name="add" size={24} />
      <Icon status="error" name="add" size={24} />
    </View>
  )
}

export function IconSizes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Icon name="add" size={24} />
      <Icon name="add" size={48} />
      <Icon name="add" size={100} />
    </View>
  )
}

export function IconFamily() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Icon family="MaterialCommunityIcons" name="download-circle" size={48} />
      <Icon family="Ionicons" name="add" size={48} />
      <Icon family="MaterialCommunityIcons" name="home" size={48} />
    </View>
  )
}

export function IconButton() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Icon name="add" size={24} onPress={() => alert('Icon Pressed')} />
      <Icon name="add" size={48} onPress={() => alert('Icon Pressed')} />
      <Icon name="add" size={100} onPress={() => alert('Icon Pressed')} />
    </View>
  )
}
