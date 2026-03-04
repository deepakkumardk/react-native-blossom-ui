import React, {useState} from 'react'

import {
  Button,
  View,
  SegmentedButton,
} from '@react-native-blossom-ui/components'
import {useToast, ToastStatus} from '@react-native-blossom-ui/overlays'

export function ToastUsage() {
  const toast = useToast()

  return (
    <Button
      onPress={() => {
        toast.show({
          message: 'This is a toast message!',
          description: 'This is a description for the toast message.',
        })
      }}>
      Show Toast
    </Button>
  )
}

export function ToastDuration() {
  const toast = useToast()

  return (
    <View>
      <Button
        onPress={() => {
          toast.show({
            message: 'This is a toast message!',
            description: 'This is a description for the toast message.',
            duration: 500,
          })
        }}>
        Short Lived Toast
      </Button>
      <Button
        onPress={() => {
          toast.show({
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
  const toast = useToast()

  return (
    <View>
      <Button
        onPress={() => {
          toast.show({
            message: 'This is a toast message!',
            description: 'This is a description for the toast message.',
            position: 'top',
          })
        }}>
        Show Top Toast
      </Button>

      <Button
        onPress={() => {
          toast.show({
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
  const toast = useToast()
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
          toast.show({
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
