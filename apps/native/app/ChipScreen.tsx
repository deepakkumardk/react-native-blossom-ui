import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'

import {
  ChipUsage,
  ChipViewOnly,
  ChipClearable,
  ChipCheckIcon,
  ChipWithoutCheckIcon,
  ChipAsBadge,
  ChipModes,
  ChipSizes,
  ChipStatusesMobile,
  ChipDisabled,
  ChipModesSizesMobile,
  ChipAllStatuses,
  ChipAllStatusesDisabled,
  ChipCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function ChipScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <ChipUsage />

        <Heading>View Only</Heading>
        <ChipViewOnly />

        <Heading>Clearable</Heading>
        <ChipClearable />

        <Heading>Hide Check Icon</Heading>
        <ChipWithoutCheckIcon />

        <Heading>Custom Check Icon</Heading>
        <ChipCheckIcon />

        <Heading>As Badge</Heading>
        <ChipAsBadge />

        <Heading>Modes</Heading>
        <ChipModes />

        <Heading>Sizes</Heading>
        <ChipSizes />

        <Heading>Statuses</Heading>
        <ChipStatusesMobile />

        <Heading>Disabled</Heading>
        <ChipDisabled />

        <Heading>Modes & Sizes</Heading>
        <ChipModesSizesMobile />

        <Heading>Modes & Status</Heading>
        <ChipAllStatuses />

        <Heading>Modes & Status - Disabled</Heading>
        <ChipAllStatusesDisabled />

        <Heading>Custom</Heading>
        <ChipCustom />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 64,
  },
})
