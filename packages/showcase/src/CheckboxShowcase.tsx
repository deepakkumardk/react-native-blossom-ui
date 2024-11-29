import React, {useState} from 'react'
import {StyleSheet} from 'react-native'

import {View, Checkbox} from '@react-native-blossom-ui/components'

export function CheckboxUsage() {
  const [isOn, setIsOn] = useState(false)

  return (
    <View>
      <Checkbox label="primary" value={isOn} onValueChange={setIsOn} />
    </View>
  )
}

export function CheckboxPositions() {
  return (
    <View>
      <Checkbox label="Left Adjacent Position" />
      <Checkbox label="Right Adjacent Position" position="right" />
      <Checkbox label="Left Position" adjacent={false} />
      <Checkbox label="Right Position" position="right" adjacent={false} />
    </View>
  )
}

export function CheckboxStatuses() {
  const [isOn, setIsOn] = useState(true)

  return (
    <View>
      <Checkbox
        status="primary"
        label="primary"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
      />
      <Checkbox
        status="accent"
        label="accent"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
      />
      <Checkbox
        status="success"
        label="success"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
      />
      <Checkbox
        status="info"
        label="info"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
      />
      <Checkbox
        status="warning"
        label="warning"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
      />
      <Checkbox
        status="error"
        label="error"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
      />
    </View>
  )
}

export function CheckboxSizes() {
  const [isOn, setIsOn] = useState(true)

  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Checkbox
        label="small"
        size="small"
        value={isOn}
        onValueChange={setIsOn}
      />
      <Checkbox
        label="medium"
        size="medium"
        value={isOn}
        onValueChange={setIsOn}
      />
      <Checkbox
        label="large"
        size="large"
        value={isOn}
        onValueChange={setIsOn}
      />
    </View>
  )
}

export function CheckboxIndeterminate() {
  const [isOn, setIsOn] = useState(true)
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Checkbox
        label="Indeterminate"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
        indeterminate
      />
      <Checkbox
        label="Indeterminate"
        value={isOn}
        onValueChange={setIsOn}
        containerStyle={styles.itemContainer}
        indeterminate
        disabled
      />
    </View>
  )
}

export function CheckboxDisabled() {
  return (
    <View row style={{justifyContent: 'space-evenly'}}>
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled" value status="primary" disabled />
      <Checkbox label="Disabled" size="large" disabled />
    </View>
  )
}

export function CheckboxCustom() {
  const [isOn, setIsOn] = useState(true)
  return (
    <View>
      <Checkbox
        label="Agree to T&C"
        caption="Click here to see Privacy Policy"
        color="cyan"
        size="large"
        position="left"
        value={isOn}
        onValueChange={setIsOn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 64,
  },
  itemContainer: {
    marginVertical: 4,
  },
  label: {
    marginEnd: 8,
  },
})
