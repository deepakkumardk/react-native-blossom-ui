import React, {useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {View, Switch, Text} from '@react-native-blossom-ui/components'

import {SIZE_LIST, STATUS_LIST} from '../lib/constants'
import {Heading} from '../components'

export default function SwitchScreen() {
  const [isOn, setIsOn] = useState(false)

  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Sizes</Heading>
        {SIZE_LIST.map((size) => (
          <Switch
            key={size}
            label={size}
            caption={size}
            error="Error will appear here"
            size={size}
            value={isOn}
            onValueChange={setIsOn}
            containerStyle={styles.switchContainer}
          />
        ))}

        <Heading>Statuses</Heading>

        {STATUS_LIST.map((status) => (
          <Switch
            key={status}
            label={status}
            caption={status}
            error={status === 'error' ? 'Error will appear here' : ''}
            status={status}
            value={isOn}
            onValueChange={setIsOn}
            containerStyle={styles.switchContainer}
          />
        ))}

        <Heading>Custom</Heading>
        <Switch
          label="Switch next to label"
          value={isOn}
          onValueChange={setIsOn}
          labelStyle={styles.label}
          size="small"
          containerStyle={[styles.switchContainer, {justifyContent: undefined}]}
        />

        <Switch
          label="Agree to T&C"
          caption="Click here to see Privacy Policy"
          status="info"
          size="large"
          position="left"
          value={isOn}
          onValueChange={setIsOn}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  switchContainer: {
    marginVertical: 4,
  },
  label: {
    marginEnd: 8,
  },
})
