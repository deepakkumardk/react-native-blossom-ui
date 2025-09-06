import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
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
import {Heading} from '../components'

export default function AvatarScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
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
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
