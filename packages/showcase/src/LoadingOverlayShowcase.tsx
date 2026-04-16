import React, {useState} from 'react'

import {Button, View} from '@react-native-blossom-ui/components'
import {LoadingOverlay} from '@react-native-blossom-ui/overlays'

export function LoadingOverlayUsage() {
  const [visible, setVisible] = useState(false)

  const showLoading = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 2000)
  }

  return (
    <View>
      <Button onPress={showLoading}>Show Loading Overlay</Button>
      <LoadingOverlay visible={visible} />
    </View>
  )
}

export function LoadingOverlayCustom() {
  const [visible, setVisible] = useState(false)

  const showLoading = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 3000)
  }

  return (
    <View>
      <Button onPress={showLoading}>Custom Loading Overlay</Button>
      <LoadingOverlay
        visible={visible}
        size={80}
        status="error"
        backdropStyle={{
          backgroundColor: 'rgba(100, 100, 100, 0.5)',
        }}
      />
    </View>
  )
}
