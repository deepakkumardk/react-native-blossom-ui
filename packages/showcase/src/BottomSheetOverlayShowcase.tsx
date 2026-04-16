import React, {useState} from 'react'

import {Button, Text, View} from '@react-native-blossom-ui/components'
import {BottomSheet} from '@react-native-blossom-ui/overlays'

export function BottomSheetOverlayUsage() {
  const [visible, setVisible] = useState(false)
  return (
    <View>
      <Button onPress={() => setVisible(true)}>Show BottomSheet</Button>
      <BottomSheet visible={visible} onDismiss={() => setVisible(false)}>
        <View>
          <Text typography="b1">This is a BottomSheet overlay</Text>
          <Text typography="l3">
            You can add any content here, and it will appear as a bottom sheet
            overlay. Tap outside the sheet or press the button below to dismiss
            it.
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
      </BottomSheet>
    </View>
  )
}
