import React from 'react'

import {View, Button} from '@react-native-blossom-ui/components'

export function ViewUsage() {
  return (
    <View>
      <Button title="Child Components" />
    </View>
  )
}

export function ViewRow() {
  return (
    <View row>
      <Button title="Awesome" />
      <Button title="Blossom" />
    </View>
  )
}
