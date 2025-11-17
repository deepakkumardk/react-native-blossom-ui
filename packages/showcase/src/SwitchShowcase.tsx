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

export function SwitchDefaultValue() {
  return (
    <View>
      <Switch defaultValue />
    </View>
  )
}

export function SwitchControlled() {
  const [isOn, setIsOn] = useState(false)

  return (
    <View>
      <Switch value={isOn} onValueChange={setIsOn} />
    </View>
  )
}

export function SwitchPositions() {
  return (
    <View>
      <Switch
        label="Left Position"
        caption="Left Position caption"
        adjacent={false}
        containerStyle={styles.container}
      />
      <Switch
        label="Right Position"
        caption="Right Position caption"
        position="right"
        adjacent={false}
        containerStyle={styles.container}
      />
      <Switch
        label="Left Adjacent Position"
        caption="Left Adjacent Position caption"
        containerStyle={styles.container}
      />
      <Switch
        label="Right Adjacent Position"
        caption="Right Adjacent Position caption"
        position="right"
        containerStyle={styles.container}
      />
    </View>
  )
}

export function SwitchStatuses() {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <Switch
        status="primary"
        label="primary"
        containerStyle={styles.container}
      />
      <Switch
        status="accent"
        label="accent"
        containerStyle={styles.container}
      />
      <Switch
        status="success"
        label="success"
        containerStyle={styles.container}
      />
      <Switch status="info" label="info" containerStyle={styles.container} />
      <Switch
        status="warning"
        label="warning"
        containerStyle={styles.container}
      />
      <Switch status="error" label="error" containerStyle={styles.container} />
    </View>
  )
}

export function SwitchSizes() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Switch label="small" size="small" />
      <Switch label="medium" size="medium" />
      <Switch label="large" size="large" />
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

export function SwitchTextFieldsContainerStyle() {
  return (
    <View>
      <Switch
        label="Text Fields Switch"
        caption="Custom style for text fields container"
        textFieldsContainerStyle={{backgroundColor: 'lightgrey'}}
      />
    </View>
  )
}

export function SwitchError() {
  const [isOn, setIsOn] = useState(false)

  return (
    <View>
      <Switch
        label="Agree to T&C"
        caption="Click here to see Privacy Policy"
        status="info"
        position="left"
        size="large"
        adjacent={false}
        value={isOn}
        onValueChange={setIsOn}
        error={isOn ? '' : 'Please Agree to T&C to continue'}
        containerStyle={styles.container}
      />
      <Switch
        label="Agree to T&C"
        caption="Click here to see Privacy Policy"
        status="info"
        position="right"
        size="large"
        adjacent={false}
        value={isOn}
        onValueChange={setIsOn}
        error={isOn ? '' : 'Please Agree to T&C to continue'}
        containerStyle={styles.container}
      />
      <Switch
        label="Agree to T&C"
        caption="Click here to see Privacy Policy"
        status="info"
        position="left"
        size="large"
        adjacent
        value={isOn}
        onValueChange={setIsOn}
        error={isOn ? '' : 'Please Agree to T&C to continue'}
        containerStyle={styles.container}
      />
      <Switch
        label="Agree to T&C"
        caption="Click here to see Privacy Policy"
        status="info"
        position="right"
        size="large"
        adjacent
        value={isOn}
        onValueChange={setIsOn}
        error={isOn ? '' : 'Please Agree to T&C to continue'}
        containerStyle={styles.container}
      />
    </View>
  )
}

export function SwitchCustom() {
  const [isOn, setIsOn] = useState(true)

  return (
    <View>
      <Switch
        label="Agree to T&C"
        caption="Click here to see Privacy Policy"
        color="green"
        size="large"
        adjacent={false}
        value={isOn}
        onValueChange={setIsOn}
        error={isOn ? '' : 'Please Agree to T&C to continue'}
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
