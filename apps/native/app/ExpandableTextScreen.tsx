import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {View} from '@react-native-blossom-ui/components'
import {
  ExpandableTextUsage,
  ExpandableTextLines,
  ExpandableTextLessLines,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function ExpandableTextScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <ExpandableTextUsage />

        <Heading>With Less Lines</Heading>
        <ExpandableTextLessLines />

        <Heading>With overflow texts</Heading>
        <ExpandableTextLines />
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
