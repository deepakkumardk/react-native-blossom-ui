import React from 'react'
import {StyleSheet} from 'react-native'
import {
  Text,
  View,
  ActivityIndicator,
} from '@react-native-blossom-ui/components'
import {STATUS_LIST} from '../lib/constants'

export default function LoaderScreen() {
  return (
    <View style={styles.container}>
      {STATUS_LIST.map((value) => (
        <View key={value} style={styles.loaderItem}>
          <ActivityIndicator status={value} size="medium" />
          <Text status={value} typography="h6">
            {value}
          </Text>
        </View>
      ))}
      <View style={styles.row}>
        <ActivityIndicator color="green" size={40} />
        <Text typography="h6">Custom Loader</Text>
      </View>
      <ActivityIndicator size={80} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  main: {
    flex: 1,
  },
  loaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
