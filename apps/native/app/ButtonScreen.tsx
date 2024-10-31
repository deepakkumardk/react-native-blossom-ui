import React from 'react'
import {Alert, StyleSheet} from 'react-native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import {Text, View, Button} from '@react-native-blossom-ui/components'
import {BUTTON_MODES, STATUS_LIST} from '../lib/constants'

export default function ButtonScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {BUTTON_MODES.map((value) => (
          <Button key={value} mode={value} style={styles.button}>
            {value}
          </Button>
        ))}
      </View>
      <View style={styles.row}>
        {BUTTON_MODES.map((value) => (
          <Button key={value} mode={value} status="error" style={styles.button}>
            {value}
          </Button>
        ))}
      </View>
      {STATUS_LIST.map((value) => (
        <Button key={value} status={value} style={styles.button}>
          {value}
        </Button>
      ))}
      <Button
        loaderStyle={{
          color: 'red',
        }}
        style={[styles.button, {width: '100%', backgroundColor: 'green'}]}
        onPress={() => Alert.alert('Hello')}>
        Prefix <Text status="error">Custom Button</Text> Suffix
      </Button>
      <View style={styles.row}>
        <Button
          isLoading
          loaderStyle={{
            color: 'white',
          }}
          style={styles.button}>
          Loading...
        </Button>
        <Button
          left={<MaterialCommunityIcons name="plus" size={24} color="white" />}
          status="success"
          style={styles.button}
        />
      </View>
      <Button
        disabled
        left={<MaterialCommunityIcons name="cancel" size={24} color="white" />}
        right={<MaterialCommunityIcons name="cancel" size={24} color="white" />}
        style={styles.button}
        status="success"
        onPress={() => Alert.alert('Hello')}>
        Disabled Button
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginVertical: 4,
  },
})
