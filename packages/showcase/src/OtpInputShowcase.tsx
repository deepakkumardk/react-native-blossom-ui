import React from 'react'

import {View, OtpInput} from '@react-native-blossom-ui/components'

export function OtpInputUsage() {
  return (
    <View>
      <OtpInput secureTextEntry onComplete={(otp) => alert(otp)} />
    </View>
  )
}

export function OtpInputModes() {
  return (
    <View>
      <OtpInput mode="box" />
      <OtpInput mode="dash" />
    </View>
  )
}

export function OtpInputPlaceholder() {
  return (
    <View>
      <OtpInput placeholder="*" status="success" />
    </View>
  )
}

export function OtpInputWithCursor() {
  return (
    <View>
      <OtpInput withCursor />
    </View>
  )
}

export function OtpInputAsPin() {
  return (
    <View>
      <OtpInput withCursor secureTextEntry />
    </View>
  )
}

export function OtpInputSizes() {
  return (
    <View>
      <OtpInput size="small" />
      <OtpInput size="medium" />
      <OtpInput size="large" />
    </View>
  )
}

export function OtpInputCustom() {
  const [isCompleted, setIsCompleted] = React.useState(false)

  return (
    <View>
      <OtpInput
        maxLength={6}
        withAlphanumericKeyboard
        label="Custom OTP Input"
        labelStyle={{color: 'cyan'}}
        caption="Enter your OTP"
        captionStyle={{color: 'green'}}
        error={isCompleted ? 'OTP is required' : ''}
        boxStyle={(isFocused) => ({
          borderRadius: 40,
          backgroundColor: isFocused ? 'blue' : 'gold',
        })}
        inputTextStyle={{
          color: 'black',
          fontWeight: 'bold',
        }}
        onChangeText={(otp) => {
          setIsCompleted(otp.length !== 6)
        }}
      />
    </View>
  )
}
