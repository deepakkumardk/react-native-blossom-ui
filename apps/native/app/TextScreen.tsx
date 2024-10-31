import React from 'react'
import {StyleSheet} from 'react-native'
import {
  Text,
  View,
  TypographyOptions,
} from '@react-native-blossom-ui/components'

export default function TextScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {typographyList.map((value) => (
          <Text key={value} typography={value}>
            This is {value} Text
          </Text>
        ))}
        <Text style={styles.subtitle}>This is Long text with font size</Text>
        <Text status="primary">This is text with primary status</Text>
        <Text status="error">This is text with error status</Text>

        <Text typography="b1">My Title</Text>
        <Text>Lorem ipsum body</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  main: {
    flex: 1,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 30,
    color: '#38434D',
  },
})

const typographyList: TypographyOptions[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',

  's1',
  's2',
  'b1',
  'b2',
  'b3',
  'l1',
  'l2',
  'c1',
  'c2',
]
