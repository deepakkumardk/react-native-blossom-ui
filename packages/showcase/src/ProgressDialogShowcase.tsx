import React, {useState} from 'react'

import {Button, View} from '@react-native-blossom-ui/components'
import {ProgressDialog} from '@react-native-blossom-ui/overlays'

export function ProgressDialogUsage() {
  const [visible, setVisible] = useState(false)

  const showProgress = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 3000)
  }

  return (
    <View>
      <Button onPress={showProgress}>Show Progress Dialog</Button>
      <ProgressDialog visible={visible} />
    </View>
  )
}

export function ProgressDialogLabel() {
  const [visible, setVisible] = useState(false)

  const showProgress = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 3000)
  }

  return (
    <View>
      <Button onPress={showProgress}>Show with Custom Label</Button>
      <ProgressDialog visible={visible} label="Please wait, processing..." />
    </View>
  )
}

export function ProgressDialogCustom() {
  const [visible, setVisible] = useState(false)

  const showProgress = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 3000)
  }

  return (
    <View>
      <Button onPress={showProgress}>Custom Progress Dialog</Button>
      <ProgressDialog
        visible={visible}
        label="Deleting files..."
        labelStyle={{color: 'red', fontSize: 20, fontWeight: '600'}}
        activityIndicatorProps={{status: 'error', size: 'large'}}
      />
    </View>
  )
}
