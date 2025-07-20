import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
import {ModalUsage, ModalWithScroll} from '@react-native-blossom-ui/showcase'

import {Heading} from '../components'

export default function ModalScreen() {
  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Heading>Usage</Heading>
        <ModalUsage />

        <Heading>With Scroll</Heading>
        <ModalWithScroll />
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
