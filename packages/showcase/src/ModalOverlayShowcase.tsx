import React, {useState} from 'react'

import {Button, Text, View} from '@react-native-blossom-ui/components'
import {Modal} from '@react-native-blossom-ui/overlays'

export function ModalOverlayUsage() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Show Modal</Button>
      <Modal visible={visible} onDismiss={() => setVisible(false)}>
        <View>
          <Text typography="b1">This is a Modal overlay</Text>
          <Text typography="l3">
            You can add any content here, and it will appear as a modal. Tap
            outside the modal or press the button below to dismiss it.
          </Text>

          <Button
            style={{
              marginVertical: 16,
              justifyContent: 'flex-end',
            }}
            onPress={() => setVisible(false)}>
            Close
          </Button>
        </View>
      </Modal>
    </View>
  )
}
