import React from 'react'
import {StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'
import {CardUsage} from '@react-native-blossom-ui/showcase'
import {Heading} from '../components'

export default function CardScreen() {
  return (
    <Surface style={styles.container}>
      <Heading>Usage</Heading>
      <CardUsage />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
