import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {View} from '@react-native-blossom-ui/components'
import {
  AccordionUsage,
  AccordionCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function AccordionScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <AccordionUsage />

        <Heading>Custom</Heading>
        <AccordionCustom />
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
