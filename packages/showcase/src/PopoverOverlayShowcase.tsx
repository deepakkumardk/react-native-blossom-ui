import React, {useState} from 'react'

import {
  View,
  Button,
  Text,
  useBlossomTheme,
  SegmentedButton,
} from '@react-native-blossom-ui/components'
import {Popover, PopoverPosition} from '@react-native-blossom-ui/overlays'

export function PopoverOverlayUsage() {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover
      visible={showPopover}
      Target={
        <Button onPress={() => setShowPopover((prev) => !prev)}>
          Show Popover
        </Button>
      }
      onDismiss={() => {
        setShowPopover(false)
      }}>
      <Text typography="h4">I am Popover Content</Text>
    </Popover>
  )
}

export function PopoverOverlayPosition() {
  const [showPopover, setShowPopover] = useState(false)
  const options: {label: string; value: string}[] = [
    'left',
    'top',
    'bottom',
    'right',
  ].map((value) => ({
    label: value,
    value,
  }))

  const [position, setPosition] = useState<PopoverPosition>('bottom')

  return (
    <View>
      <SegmentedButton
        data={options.map((item) => ({
          title: item.label,
          label: item.label,
          value: item.value,
        }))}
        onPress={(value) => setPosition(value as PopoverPosition)}
      />
      <Popover
        visible={showPopover}
        position={position}
        targetContainerStyle={{alignSelf: 'center'}}
        Target={
          <Button onPress={() => setShowPopover((prev) => !prev)}>Show</Button>
        }
        onDismiss={() => {
          setShowPopover(false)
        }}>
        <Text typography="h4">I am Popover Content. </Text>
      </Popover>
    </View>
  )
}

export function PopoverOverlayOffset() {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover
      visible={showPopover}
      offsetX={30}
      offsetY={10}
      Target={
        <Button onPress={() => setShowPopover((prev) => !prev)}>
          With Offset
        </Button>
      }
      onDismiss={() => {
        setShowPopover(false)
      }}>
      <Text typography="h4">I am Popover Content</Text>
    </Popover>
  )
}

export function PopoverOverlayArrow() {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover
      visible={showPopover}
      withArrow
      Target={
        <Button onPress={() => setShowPopover((prev) => !prev)}>
          With Arrow
        </Button>
      }
      onDismiss={() => {
        setShowPopover(false)
      }}>
      <Text typography="h4">Look at the arrow!</Text>
    </Popover>
  )
}

export function PopoverOverlayArrowOffset() {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover
      visible={showPopover}
      position="right"
      offsetX={10}
      offsetY={10}
      withArrow
      arrowOffset={-10}
      Target={
        <Button onPress={() => setShowPopover((prev) => !prev)}>
          Arrow Offset
        </Button>
      }
      onDismiss={() => {
        setShowPopover(false)
      }}>
      <Text typography="h4">Look at the arrow!</Text>
    </Popover>
  )
}

export function PopoverOverlayFitTargetWidth() {
  const {colors} = useBlossomTheme()
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover
      fitTargetWidth
      visible={showPopover}
      contentStyle={{backgroundColor: colors.primary100}}
      Target={
        <Button
          title="Show Popover"
          style={{width: '100%'}}
          onPress={() => setShowPopover((prev) => !prev)}
        />
      }
      onDismiss={() => setShowPopover(false)}>
      <Text typography="h6" status="accent">
        I am Popover Content
      </Text>
      <Button>Popover Button</Button>
    </Popover>
  )
}
