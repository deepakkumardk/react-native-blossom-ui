import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  AvatarUsage,
  AvatarModes,
  AvatarStatusesSmall,
  AvatarSizes,
  AvatarModesSizes,
} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function AvatarScreen() {
  return (
    <View style={styles.container}>
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
