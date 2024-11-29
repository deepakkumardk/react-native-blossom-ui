import React, {useState} from 'react'
import {StyleSheet} from 'react-native'

import {View, Radio} from '@react-native-blossom-ui/components'

export function RadioUsage() {
  const [isOn, setIsOn] = useState(false)

  return (
    <View>
      <Radio
        label="Enable Awesome Feature"
        value={isOn}
        onValueChange={setIsOn}
      />
    </View>
  )
}

export function RadioPositions() {
  return (
    <View>
      <Radio
        label="Left Adjacent Position"
        caption="Right Adjacent Position"
        containerStyle={styles.container}
      />
      <Radio
        label="Right Adjacent Position"
        caption="Right Adjacent Position"
        position="right"
        containerStyle={styles.container}
      />
      <Radio
        caption="Right Adjacent Position"
        label="Left Position"
        adjacent={false}
        containerStyle={styles.container}
      />
      <Radio
        caption="Right Adjacent Position"
        label="Right Position"
        position="right"
        adjacent={false}
        containerStyle={styles.container}
      />
    </View>
  )
}

export function RadioStatuses() {
  const [isOn, setIsOn] = useState(false)

  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Radio
        status="primary"
        label="primary"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Radio
        status="accent"
        label="accent"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Radio
        status="success"
        label="success"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Radio
        status="info"
        label="info"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Radio
        status="warning"
        label="warning"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
      <Radio
        status="error"
        label="error"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.container}
      />
    </View>
  )
}

export function RadioSizes() {
  const [isOn, setIsOn] = useState(true)

  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Radio label="small" size="small" value={isOn} onValueChange={setIsOn} />
      <Radio
        label="medium"
        size="medium"
        value={isOn}
        onValueChange={setIsOn}
      />
      <Radio label="large" size="large" value={isOn} onValueChange={setIsOn} />
    </View>
  )
}

export function RadioDisabled() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Radio label="Disabled" disabled />
      <Radio label="Disabled" value status="primary" disabled />
      <Radio label="Disabled" size="large" disabled />
    </View>
  )
}

export function RadioCustom() {
  const [isOn, setIsOn] = useState(true)

  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Radio
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
      <Radio
        label="Centered color Radio"
        status="info"
        color="green"
        value={isOn}
        size="medium"
        onValueChange={setIsOn}
        containerStyle={[styles.container, {justifyContent: 'center'}]}
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
