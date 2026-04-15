import React, {useState} from 'react'

import {Dialog} from '@react-native-blossom-ui/overlays'
import {
  Button,
  Icon,
  Text,
  View,
  TextInput,
} from '@react-native-blossom-ui/components'

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

export function DialogWithoutIcon() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Dialog Without Icon</Button>
      <Dialog.Alert
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed with this action?"
        actions={[
          {children: 'Cancel', onPress: () => setVisible(false)},
          {
            children: 'Confirm',
            onPress: () => setVisible(false),
            mode: 'filled',
          },
        ]}
      />
    </View>
  )
}

export function DialogSingleAction() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Single Action Dialog</Button>
      <Dialog.Alert
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Success!"
        description="Your changes have been saved successfully."
        icon={
          <Icon
            family="Ionicons"
            name="checkmark-circle"
            size={48}
            status="success"
          />
        }
        actions={[
          {children: 'OK', onPress: () => setVisible(false), mode: 'filled'},
        ]}
      />
    </View>
  )
}

export function DialogBlockBackdrop() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Block Backdrop</Button>
      <Dialog.Alert
        visible={visible}
        onDismiss={() => setVisible(false)}
        backdropBehavior="block"
        title="Important Notice"
        description="This dialog cannot be dismissed by tapping outside. You must press a button."
        icon={
          <Icon family="Ionicons" name="warning" size={48} status="warning" />
        }
        actions={[
          {
            children: 'I Understand',
            onPress: () => setVisible(false),
            mode: 'filled',
          },
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

export function DialogComposedWithForm() {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const onDismiss = () => {
    setVisible(false)
    setName('')
    setEmail('')
  }

  const onSubmit = () => {
    // Handle form submission
    onDismiss()
  }

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Dialog with Form</Button>

      <Dialog.Root visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Contact Information</Dialog.Title>
        <Dialog.Content>
          <Text style={{marginBottom: 8}}>Please enter your details:</Text>
          <View style={{marginBottom: 12}}>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              accessibilityLabel="Name input"
            />
          </View>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            accessibilityLabel="Email input"
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Dialog.Action onPress={onDismiss}>Cancel</Dialog.Action>
          <Dialog.Action onPress={onSubmit} mode="filled">
            Submit
          </Dialog.Action>
        </Dialog.Actions>
      </Dialog.Root>
    </View>
  )
}

export function DialogComposedCustomStyle() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Custom Styled Dialog</Button>

      <Dialog.Root visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Icon>
          <Icon family="Ionicons" name="trash" size={48} status="error" />
        </Dialog.Icon>
        <Dialog.Title style={{color: '#ef4444'}}>Delete Account</Dialog.Title>
        <Dialog.Content>
          <Text status="error">
            This action is permanent and cannot be undone. All your data will be
            permanently deleted from our servers.
          </Text>
        </Dialog.Content>

        <Dialog.Actions>
          <Dialog.Action onPress={() => setVisible(false)}>
            Cancel
          </Dialog.Action>
          <Dialog.Action
            onPress={() => setVisible(false)}
            mode="filled"
            status="error">
            Delete
          </Dialog.Action>
        </Dialog.Actions>
      </Dialog.Root>
    </View>
  )
}
