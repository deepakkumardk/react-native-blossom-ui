import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View, Icon} from '@react-native-blossom-ui/components'

import {STATUS_LIST} from '../lib/constants'
import {Heading} from '../components'

export default function IconScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Statuses</Heading>
        <View style={styles.row}>
          {STATUS_LIST.map((status) => (
            <Icon key={status} status={status} name="add" size={32} />
          ))}
        </View>
        <Heading>Custom</Heading>
        <View style={styles.row}>
          <Icon name="add" size={24} />
          <Icon name="add" size={32} />
          <Icon name="add" size={64} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
