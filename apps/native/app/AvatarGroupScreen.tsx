import React from 'react'
import {
  AvatarGroupUsage,
  AvatarGroupMaxCount,
  AvatarGroupSizes,
  AvatarGroupCustom,
  AvatarGroupBringToFront,
  AvatarGroupCustomZIndex,
  AvatarGroupSpacing,
  AvatarGroupStatuses,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function AvatarGroupScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <AvatarGroupUsage />

      <Heading>Max Count</Heading>
      <AvatarGroupMaxCount />

      <Heading>Size</Heading>
      <AvatarGroupSizes />

      <Heading>Bring to Front</Heading>
      <AvatarGroupBringToFront />

      <Heading>Spacing</Heading>
      <AvatarGroupSpacing />

      <Heading>Custom Z-Index</Heading>
      <AvatarGroupCustomZIndex />

      <Heading>Status</Heading>
      <AvatarGroupStatuses />

      <Heading>Custom</Heading>
      <AvatarGroupCustom />
    </AppScrollView>
  )
}
