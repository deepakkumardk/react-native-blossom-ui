import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View} from '@react-native-blossom-ui/components'
import {
  BottomSheetUsage,
  BottomSheetWithScroll,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function BottomSheetScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <BottomSheetUsage />

        <Heading>With Scroll</Heading>
        <BottomSheetWithScroll />
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
