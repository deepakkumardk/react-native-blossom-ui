import React, {useRef, useState} from 'react'

import {
  View,
  Popover,
  Button,
  Text,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'

export function PopoverUsage() {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <View>
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
    </View>
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
    <View>
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
    </View>
  )
}
