import React, {useState} from 'react'

import {
  View,
  Modal,
  ModalContent,
  Button,
} from '@react-native-blossom-ui/components'

export function ModalUsage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <View>
      <Button onPress={() => setShowModal(true)}>Open Modal</Button>
      <Modal visible={showModal} onBackdropPress={() => setShowModal(false)}>
        <ModalContent
          title="Hello world"
          description="Lorem ipsum"
          actionButtons={[
            {
              title: 'Cancel',
              onPress: () => setShowModal(false),
            },
            {
              title: 'Done',
              onPress: () => setShowModal(false),
            },
          ]}
        />
      </Modal>
    </View>
  )
}
