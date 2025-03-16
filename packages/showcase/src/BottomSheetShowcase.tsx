import React, {useState} from 'react'
import {FlatList, TouchableOpacity} from 'react-native'

import {
  View,
  BottomSheet,
  Button,
  Text,
  Spacer,
  ModalContent,
} from '@react-native-blossom-ui/components'

export function BottomSheetUsage() {
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  return (
    <View>
      <Button onPress={() => setShowBottomSheet(true)}>Open BottomSheet</Button>
      <BottomSheet
        visible={showBottomSheet}
        onBackdropPress={() => setShowBottomSheet(false)}>
        <ModalContent
          title="Hello world"
          description="Lorem ipsum"
          actionButtons={[
            {
              title: 'Cancel',
              onPress: () => setShowBottomSheet(false),
            },
            {
              title: 'Done',
              onPress: () => setShowBottomSheet(false),
            },
          ]}
        />
      </BottomSheet>
    </View>
  )
}

export function BottomSheetWithScroll() {
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  return (
    <View>
      <Button onPress={() => setShowBottomSheet(true)}>
        Scrollable BottomSheet
      </Button>
      <BottomSheet
        visible={showBottomSheet}
        onBackdropPress={() => setShowBottomSheet(false)}>
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
      </BottomSheet>
    </View>
  )
}
