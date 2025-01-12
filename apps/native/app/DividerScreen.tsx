import React from 'react'
import {StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {DividerUsage, DividerVertical} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function DividerScreen() {
  return (
    <View style={styles.container}>
      <Heading>Usage</Heading>
      <DividerUsage />

      <Heading>Vertical</Heading>
      <DividerVertical />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
