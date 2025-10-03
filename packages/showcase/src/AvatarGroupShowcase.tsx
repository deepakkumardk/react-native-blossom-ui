import React from 'react'
import {Image} from 'react-native'
import {AvatarGroup, Text, View} from '@react-native-blossom-ui/components'

const AVATAR_GROUP_DATA = Array.from({length: 8}).map((_, index) => ({
  url: `https://picsum.photos/200/300?random=${index}`,
}))

export function AvatarGroupUsage() {
  return (
    <View>
      <AvatarGroup avatars={AVATAR_GROUP_DATA} />
    </View>
  )
}

export function AvatarGroupMaxCount() {
  return (
    <View>
      <AvatarGroup avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup max={2} avatars={AVATAR_GROUP_DATA.slice(0, 2)} />
    </View>
  )
}

export function AvatarGroupSizes() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <AvatarGroup size="small" avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup size="medium" avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup size="large" avatars={AVATAR_GROUP_DATA} />
    </View>
  )
}

export function AvatarGroupStatuses() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <AvatarGroup status="primary" avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup status="accent" avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup status="success" avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup status="info" avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup status="warning" avatars={AVATAR_GROUP_DATA} />
      <AvatarGroup status="error" avatars={AVATAR_GROUP_DATA} />
    </View>
  )
}

export function AvatarGroupImgComponent() {
  return (
    <View>
      <AvatarGroup imgComponent={Image} avatars={AVATAR_GROUP_DATA} />
    </View>
  )
}

export function AvatarGroupBringToFront() {
  return (
    <View>
      <AvatarGroup avatars={AVATAR_GROUP_DATA} bringToFront />
    </View>
  )
}

export function AvatarGroupSpacing() {
  return (
    <View>
      <AvatarGroup bringToFront avatars={AVATAR_GROUP_DATA} spacing={-32} />
    </View>
  )
}

export function AvatarGroupCustomZIndex() {
  return (
    <View>
      <AvatarGroup
        max={5}
        avatars={AVATAR_GROUP_DATA.map((avatar, index) => ({
          ...avatar,
          zIndex: index % 2 === 0 ? 10 : -10,
        }))}
      />
    </View>
  )
}

export function AvatarGroupCustom() {
  return (
    <View>
      <AvatarGroup
        avatars={AVATAR_GROUP_DATA}
        onPress={() => alert('Avatar Pressed')}
        size={40}
        style={{alignSelf: 'center', borderWidth: 2, borderColor: 'yellow'}}
        renderCount={(count) => (
          <View
            style={{
              backgroundColor: 'gray',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>+{count}</Text>
          </View>
        )}
      />
    </View>
  )
}
