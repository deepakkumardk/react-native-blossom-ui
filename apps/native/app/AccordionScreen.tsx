import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {Surface} from '@react-native-blossom-ui/components'
import {
  AccordionUsage,
  AccordionCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function AccordionScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <AccordionUsage />

        <Heading>Custom</Heading>
        <AccordionCustom />
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
