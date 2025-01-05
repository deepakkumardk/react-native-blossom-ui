import React, {useRef, useState} from 'react'

import {
  View,
  Popover,
  Button,
  Text,
  useBlossomTheme,
  Select,
} from '@react-native-blossom-ui/components'

export function PopoverUsage() {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover
      visible={showPopover}
      Target={
        <Button onPress={() => setShowPopover((prev) => !prev)}>
          Show Popover
        </Button>
      }
      onBackdropPress={() => {
        setShowPopover(false)
      }}>
      <Text typography="h4">I am Popover Content</Text>
    </Popover>
  )
}

export function PopoverPosition() {
  const [showPopover, setShowPopover] = useState(false)
  const options = ['top', 'bottom', 'left', 'right'].map((value) => ({
    label: value,
    value,
  }))

  const [position, setPosition] = useState<string | undefined>('bottom')

  return (
    <View>
      <Select
        options={options}
        value={position}
        onValueChange={(value) => setPosition(value)}
      />
      <Popover
        visible={showPopover}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        position={position}
        // fitTargetWidth
        Target={
          <Button
            style={{alignSelf: 'center'}}
            onPress={() => setShowPopover((prev) => !prev)}>
            Show
          </Button>
        }
        onBackdropPress={() => {
          setShowPopover(false)
        }}>
        <Text typography="h4">{'I am Popover Content'.repeat(2)}</Text>
      </Popover>
    </View>
  )
}

export function PopoverOffset() {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover
      visible={showPopover}
      offset={20}
      Target={
        <Button onPress={() => setShowPopover((prev) => !prev)}>
          With Offset
        </Button>
      }
      onBackdropPress={() => {
        setShowPopover(false)
      }}>
      <Text typography="h4">I am Popover Content</Text>
    </Popover>
  )
}

export function PopoverTargetRefUsage() {
  const [showPopover, setShowPopover] = useState(false)
  const targetRef = useRef(null)

  return (
    <View>
      <View ref={targetRef}>
        <Button onPress={() => setShowPopover((prev) => !prev)}>
          Show Popover
        </Button>
      </View>
      <Popover
        visible={showPopover}
        targetRef={targetRef}
        onBackdropPress={() => {
          setShowPopover(false)
        }}>
        <Text typography="h6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </Text>
      </Popover>
    </View>
  )
}

export function PopoverFitTargetWidth() {
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
      onBackdropPress={() => setShowPopover(false)}>
      <Text typography="h6" status="accent">
        I am Popover Content
      </Text>
      <Button>Popover Button</Button>
    </Popover>
  )
}
