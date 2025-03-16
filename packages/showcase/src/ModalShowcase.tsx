import React, {useState} from 'react'
import {FlatList, TouchableOpacity} from 'react-native'

import {
  View,
  Modal,
  ModalContent,
  Button,
  Text,
  Spacer,
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

export function ModalWithScroll() {
  const [showModal, setShowModal] = useState(false)

  return (
    <View>
      <Button onPress={() => setShowModal(true)}>Scrollable Modal</Button>
      <Modal visible={showModal} onBackdropPress={() => setShowModal(false)}>
        <ModalContent
          title="Scrollable Content"
          actionButtons={[
            {
              title: 'Cancel',
              onPress: () => setShowModal(false),
            },
            {
              title: 'Done',
              onPress: () => setShowModal(false),
            },
          ]}>
          <Spacer />
          <FlatList
            data={Array(100)
              .fill(0)
              .map((_, i) => `Item ${i}`)}
            renderItem={({item}) => (
              <TouchableOpacity accessibilityRole="text" activeOpacity={1}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </ModalContent>
      </Modal>
    </View>
  )
}
