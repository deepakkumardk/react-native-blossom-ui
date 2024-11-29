import React, {useState} from 'react'
import {StyleSheet} from 'react-native'

import {View, Switch} from '@react-native-blossom-ui/components'

export function SwitchUsage() {
  return (
    <View>
      <Switch label="Enable Awesome Feature" />
    </View>
  )
}

export function SwitchPositions() {
  return (
    <View>
      <Switch
        label="Left Adjacent Position"
        containerStyle={styles.container}
      />
      <Switch
        label="Right Adjacent Position"
        position="right"
        containerStyle={styles.container}
      />
      <Switch
        label="Left Position"
        adjacent={false}
        containerStyle={styles.container}
      />
      <Switch
        label="Right Position"
        position="right"
        adjacent={false}
        containerStyle={styles.container}
      />
    </View>
  )
}

export function SwitchStatuses() {
  const [isOn, setIsOn] = useState(false)

  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Switch
        status="primary"
        label="primary"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Switch
        status="accent"
        label="accent"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Switch
        status="success"
        label="success"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Switch
        status="info"
        label="info"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Switch
        status="warning"
        label="warning"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Switch
        status="error"
        label="error"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
    </View>
  )
}

export function SwitchSizes() {
  const [isOn, setIsOn] = useState(true)

  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Switch label="small" size="small" value={isOn} onValueChange={setIsOn} />
      <Switch
        label="medium"
        size="medium"
        value={isOn}
        onValueChange={setIsOn}
      />
      <Switch label="large" size="large" value={isOn} onValueChange={setIsOn} />
    </View>
  )
}

export function SwitchDisabled() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Switch size="small" label="Disabled" disabled />
      <Switch size="small" label="Disabled" value status="primary" disabled />
      <Switch size="small" label="Disabled" disabled />
    </View>
  )
}

export function SwitchCustom() {
  const [isOn, setIsOn] = useState(true)
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Switch
        label="Agree to T&C"
        caption="Click here to see Privacy Policy"
        status="info"
        size="large"
        adjacent={false}
        value={isOn}
        onValueChange={setIsOn}
        error={isOn ? '' : 'Please Agree to T&C to continue'}
        containerStyle={styles.container}
      />
      <Switch
        label="Custom color switch"
        status="info"
        color="green"
        value={isOn}
        size="medium"
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  label: {
    marginEnd: 8,
  },
})
