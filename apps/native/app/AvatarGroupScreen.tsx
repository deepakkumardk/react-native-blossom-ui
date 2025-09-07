import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
import {
  AvatarGroupUsage,
  AvatarGroupSizes,
  AvatarGroupCustom,
  AvatarGroupBringToFront,
  AvatarGroupCustomZIndex,
  AvatarGroupSpacing,
  AvatarGroupStatuses,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function AvatarGroupScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <AvatarGroupUsage />

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
