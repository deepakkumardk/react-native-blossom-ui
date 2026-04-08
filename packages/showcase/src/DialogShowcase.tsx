import React, {useState} from 'react'

import {Dialog} from '@react-native-blossom-ui/overlays'
import {Button, Icon, Text, View} from '@react-native-blossom-ui/components'

export function DialogAlertUsage() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Show Dialog</Button>
      <Dialog.Alert
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="This is a Dialog overlay"
        description="You can add any content here, and it will appear as a modal. Tap outside the modal or press the button below to dismiss it."
        icon={
          <Icon
            family="Ionicons"
            name="information-circle"
            size={48}
            status="accent"
          />
        }
        actions={[
          {children: 'Cancel', onPress: () => setVisible(false)},
          {children: 'Confirm', onPress: () => setVisible(false)},
        ]}
      />
    </View>
  )
}

export function DialogComposedUsage() {
  const [visible, setVisible] = useState(false)

  const onDismiss = () => {
    setVisible(false)
  }

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Open Dialog</Button>

      <Dialog.Root visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon>
          <Icon
            family="Ionicons"
            name="information-circle"
            size={48}
            status="accent"
          />
        </Dialog.Icon>
        <Dialog.Title>This is a Dialog overlay</Dialog.Title>
        <Dialog.Content>
          <Text>
            You can add any content here, and it will appear as a Dialog. Tap
            outside the dialog or press the button below to dismiss it.
          </Text>
        </Dialog.Content>

        <Dialog.Actions>
          <Dialog.Action onPress={onDismiss}>Cancel</Dialog.Action>
          <Dialog.Action onPress={onDismiss}>Confirm</Dialog.Action>
        </Dialog.Actions>
      </Dialog.Root>
    </View>
  )
}
