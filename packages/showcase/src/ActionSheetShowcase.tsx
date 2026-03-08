import React from 'react'

import {Button, View} from '@react-native-blossom-ui/components'
import {ActionSheet} from '@react-native-blossom-ui/overlays'

export function ActionSheetUsage() {
  return (
    <Button
      onPress={() => {
        ActionSheet.show({
          title: 'This is a ActionSheet message!',
          options: [
            {key: 'option1', label: 'Option 1'},
            {key: 'option2', label: 'Option 2'},
            {key: 'option3', label: 'Option 3'},
          ],
          onItemPress: (key, index) => {
            console.log('ActionSheet action pressed!', key, index)
          },
        })
      }}>
      Show ActionSheet
    </Button>
  )
}

export function ActionSheetCustom() {
  return (
    <Button
      onPress={() => {
        ActionSheet.show({
          title: 'This is a custom ActionSheet message!',
          message:
            'This is a custom message for ActionSheet. You can customize the content as you want.',
          titleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'purple',
          },
          messageStyle: {
            fontSize: 16,
            color: 'gray',
          },
          options: [
            {key: 'option1', label: '🔥 Option 1'},
            {key: 'option2', label: '💧 Option 2'},
            {key: 'option3', label: '🌟 Option 3', destructive: true},
          ],
          withCancelButton: true,
          onItemPress: (key, index) => {
            console.log('ActionSheet action pressed!', key, index)
          },
        })
      }}>
      Show ActionSheet
    </Button>
  )
}
