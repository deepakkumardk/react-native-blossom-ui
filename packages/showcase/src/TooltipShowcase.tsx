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

export function TooltipAtEdge() {
  const [showTooltip, setShowTooltip] = useState('')

  return (
    <View row style={{justifyContent: 'space-between'}}>
      <Tooltip
        title="Tooltip at Top"
        visible={showTooltip === 'top'}
        position="top"
        Target={<Button onPress={() => setShowTooltip('top')}>Top</Button>}
        onBackdropPress={() => setShowTooltip('')}
      />
      <Tooltip
        title="Tooltip at Left"
        visible={showTooltip === 'left'}
        position="left"
        Target={<Button onPress={() => setShowTooltip('left')}>Left</Button>}
        onBackdropPress={() => setShowTooltip('')}
      />
      <Tooltip
        title="Tooltip at Right"
        visible={showTooltip === 'right'}
        position="right"
        Target={<Button onPress={() => setShowTooltip('right')}>Right</Button>}
        onBackdropPress={() => setShowTooltip('')}
      />
      <Tooltip
        title="Tooltip at Bottom"
        visible={showTooltip === 'bottom'}
        position="bottom"
        Target={
          <Button onPress={() => setShowTooltip('bottom')}>Bottom</Button>
        }
        onBackdropPress={() => setShowTooltip('')}
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
