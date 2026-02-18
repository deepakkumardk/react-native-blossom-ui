import React, {useMemo} from 'react'

import {
  PopoverUsage,
  PopoverPosition,
  PopoverOffset,
  PopoverFitTargetWidth,
  PopoverTargetRefUsage,
  AccordionUsage,
  ButtonModesSizesMobile,
} from '@react-native-blossom-ui/showcase'
import {Button, Surface, useOverlay} from '@react-native-blossom-ui/components'
import {Dimensions} from 'react-native'
import {Heading, AppScrollView} from '../components'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

const topRandom = () => (Math.random() * screenHeight) / 2
const leftRandom = () => (Math.random() * screenWidth) / 2

export default function PopoverScreen() {
  const {show, update, dismiss, dismissAll} = useOverlay()
  const overlayIds = React.useRef<string[]>([])
  console.log('PopoverScreen -> overlayIds', overlayIds)

  const toastContent = useMemo(
    () => (
      <Surface style={{padding: 8, borderRadius: 8, backgroundColor: 'gray'}}>
        <Heading>Toast Content</Heading>
      </Surface>
    ),
    [],
  )

  const showOverlay = () => {
    overlayIds.current.push(
      show({
        type: 'tooltip',
        // top: screenHeight - 200,
        top: topRandom(),
        left: leftRandom(),
        withBackdrop: true,
        disableBackgroundInteraction: true,
        content: toastContent,
        onDismiss() {
          const lastId = overlayIds.current.pop()
          console.log('onDismiss -> onDismiss', lastId)
          if (lastId) {
            dismiss(lastId)
          }
        },
      }),
    )
  }

  return (
    <AppScrollView>
      <Button onPress={showOverlay}>Show Overlay</Button>
      <Button
        onPress={() => {
          const lastId = overlayIds.current[overlayIds.current.length - 1]
          console.log('PopoverScreen -> lastId', lastId)

          if (lastId) {
            update(lastId, {
              top: topRandom() + 30,
              left: leftRandom() + 30,
            })
          }
        }}>
        Update Overlay
      </Button>
      <Button onPress={dismissAll}>Dismiss All</Button>
      <Heading>Usage</Heading>
      <PopoverUsage />

      <Heading>Position</Heading>
      <PopoverPosition />

      <Heading>Offset</Heading>
      <PopoverOffset />

      <Heading>Fit Target Width</Heading>
      <PopoverFitTargetWidth />

      <Heading>Ref Usage</Heading>
      <PopoverTargetRefUsage />
    </AppScrollView>
  )
}
