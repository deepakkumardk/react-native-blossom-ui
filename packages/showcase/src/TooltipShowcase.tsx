import React, {useState} from 'react'

import {View, Tooltip, Button} from '@react-native-blossom-ui/components'

export function TooltipUsage() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <View>
      <Tooltip
        title="Hey from Blossom Tooltip!"
        visible={showTooltip}
        Target={
          <Button onPress={() => setShowTooltip((prev) => !prev)}>
            Show Tooltip
          </Button>
        }
        onBackdropPress={() => {
          setShowTooltip(false)
        }}
      />
    </View>
  )
}

export function TooltipCustom() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Tooltip
      title="Hello from Tooltip!"
      visible={showTooltip}
      Target={
        <Button
          style={{alignSelf: 'center'}}
          onPress={() => setShowTooltip((prev) => !prev)}>
          Show Tooltip
        </Button>
      }
      onBackdropPress={() => {
        setShowTooltip(false)
      }}
      contentStyle={{
        backgroundColor: 'green',
        width: 160,
      }}
      titleStyle={{color: 'white'}}
    />
  )
}
