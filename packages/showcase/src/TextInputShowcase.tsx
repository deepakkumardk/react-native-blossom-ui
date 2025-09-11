/* eslint-disable react-native-a11y/has-valid-accessibility-descriptors */
import React, {useState} from 'react'

import {View, TextInput, Icon} from '@react-native-blossom-ui/components'

export function TextInputUsage() {
  return (
    <View>
      <TextInput label="Name" placeholder="Enter name" />
    </View>
  )
}

export function TextInputStatuses() {
  return (
    <View>
      <TextInput status="primary" label="Label" placeholder="Placeholder" />
      <TextInput status="accent" label="Label" placeholder="Placeholder" />
      <TextInput status="success" label="Label" placeholder="Placeholder" />
      <TextInput status="info" label="Label" placeholder="Placeholder" />
      <TextInput status="warning" label="Label" placeholder="Placeholder" />
      <TextInput status="error" label="Label" placeholder="Placeholder" />
    </View>
  )
}

export function TextInputSizes() {
  return (
    <View>
      <TextInput label="Name" placeholder="Enter name" size="small" />
      <TextInput label="Name" placeholder="Enter name" size="medium" />
      <TextInput label="Name" placeholder="Enter name" size="large" />
    </View>
  )
}

export function TextInputModes() {
  return (
    <View>
      <TextInput label="Flat Input" placeholder="Placeholder" mode="flat" />
      <TextInput
        label="Outlined Input"
        placeholder="Placeholder"
        mode="outlined"
      />
    </View>
  )
}

export function TextInputDense() {
  return (
    <View>
      <TextInput label="Label" placeholder="Placeholder" mode="flat" dense />
      <TextInput label="Label" placeholder="Placeholder" dense />
    </View>
  )
}

export function TextInputDisabled() {
  return (
    <View>
      <TextInput label="Address" placeholder="Address" value="Home" disabled />
    </View>
  )
}

export function TextInputError() {
  const [password, setPassword] = useState('')

  return (
    <View>
      <TextInput
        label="Password"
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={
          password.length < 8 ? 'Please enter a password of min. length 8' : ''
        }
      />
    </View>
  )
}

export function TextInputIcons() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View>
      <TextInput
        label="Password"
        placeholder="Enter Password"
        secureTextEntry={!showPassword}
        left={<Icon name="lock-closed" />}
        right={
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
    </View>
  )
}

export function TextInputCustom() {
  return (
    <View>
      <TextInput
        label="Custom Text Input"
        placeholder="Custom input"
        left={<Icon name="email" family="MaterialCommunityIcons" />}
        inputContainerStyle={{backgroundColor: 'cyan'}}
      />
      <TextInput
        label="Custom Text Input"
        placeholder="Custom input"
        mode="flat"
        inputContainerStyle={{backgroundColor: 'cyan'}}
      />
    </View>
  )
}
