import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'

import {
  ButtonUsage,
  ButtonModes,
  ButtonSizes,
  ButtonStatusesMobile,
  ButtonLoading,
  ButtonDisabled,
  ButtonModesSizesMobile,
  ButtonAllStatuses,
  ButtonAllStatusesDisabled,
  ButtonCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function ButtonScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <ButtonUsage />

        <Heading>Modes</Heading>
        <ButtonModes />

        <Heading>Sizes</Heading>
        <ButtonSizes />

        <Heading>Statuses</Heading>
        <ButtonStatusesMobile />

        <Heading>Loading</Heading>
        <ButtonLoading />

        <Heading>Disabled</Heading>
        <ButtonDisabled />

        <Heading>Modes & Sizes</Heading>
        <ButtonModesSizesMobile />

        <Heading>Modes & Status</Heading>
        <ButtonAllStatuses />

        <Heading>Modes & Status - Disabled</Heading>
        <ButtonAllStatusesDisabled />

        <Heading>Custom</Heading>
        <ButtonCustom />
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 64,
  },
})
