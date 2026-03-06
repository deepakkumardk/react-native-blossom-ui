import React, {useState} from 'react'

import {
  Button,
  View,
  SegmentedButton,
} from '@react-native-blossom-ui/components'
import {ToastStatus, Toast} from '@react-native-blossom-ui/overlays'

export function ToastUsage() {
  return (
    <Button
      onPress={() => {
        Toast.show({
          message: 'This is a toast message!',
          description: 'This is a description for the toast message.',
        })
      }}>
      Show Toast
    </Button>
  )
}

export function ToastDuration() {
  return (
    <View>
      <Button
        onPress={() => {
          Toast.show({
            message: 'This is a toast message!',
            description: 'This is a description for the toast message.',
            duration: 500,
          })
        }}>
        Short Lived Toast
      </Button>
      <Button
        onPress={() => {
          Toast.show({
            message: 'This is a toast message!',
            description: 'This is a description for the toast message.',
            duration: 5000,
          })
        }}>
        Long Lived Toast
      </Button>
    </View>
  )
}

export function ToastPosition() {
  return (
    <View>
      <Button
        onPress={() => {
          Toast.show({
            message: 'This is a toast message!',
            description: 'This is a description for the toast message.',
            position: 'top',
          })
        }}>
        Show Top Toast
      </Button>

      <Button
        onPress={() => {
          Toast.show({
            message: 'This is a toast message!',
            description: 'This is a description for the toast message.',
            position: 'bottom',
          })
        }}>
        Show Bottom Toast
      </Button>
    </View>
  )
}

export function ToastStatuses() {
  const [status, setStatus] = useState<ToastStatus>('default')

  return (
    <View>
      <SegmentedButton
        data={[
          {title: 'default'},
          {title: 'info'},
          {title: 'success'},
          {title: 'warning'},
          {title: 'error'},
        ]}
        onPress={(value) => {
          setStatus(value as ToastStatus)
        }}
      />

      <Button
        onPress={() => {
          Toast.show({
            message: 'This is a toast message!',
            description: 'This is a description for the toast message.',
            status,
            position: 'bottom',
          })
        }}>
        Show Bottom Toast
      </Button>
    </View>
  )
}
