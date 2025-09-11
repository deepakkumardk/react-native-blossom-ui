import React from 'react'
import {
  AvatarUsage,
  AvatarModes,
  AvatarStatusesSmall,
  AvatarSizes,
  AvatarModesSizes,
  AvatarImgComponent,
  AvatarFallbackIcon,
  AvatarFallbackSource,
  AvatarCustom,
} from '@react-native-blossom-ui/showcase'
import {Heading, AppScrollView} from '../components'

export default function AvatarScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <AvatarUsage />

      <Heading>Status</Heading>
      <AvatarStatusesSmall />

      <Heading>Modes</Heading>
      <AvatarModes />

      <Heading>Size</Heading>
      <AvatarSizes />

      <Heading>Modes & Size</Heading>
      <AvatarModesSizes />

      <Heading>Image Component</Heading>
      <AvatarImgComponent />

      <Heading>Fallback Icon</Heading>
      <AvatarFallbackIcon />

      <Heading>Fallback Source</Heading>
      <AvatarFallbackSource />

      <Heading>Custom</Heading>
      <AvatarCustom />
    </AppScrollView>
  )
}
