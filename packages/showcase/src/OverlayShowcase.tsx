import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {
  View,
  Button,
  Text,
  useOverlay,
  Surface,
  Checkbox,
  Spacer,
} from '@react-native-blossom-ui/components'
import {useWindowDimensions} from 'react-native'

export function OverlayUsage() {
  const {show, dismiss} = useOverlay()

  const toastContent = useMemo(
    () => (
      <Surface style={{padding: 16, borderRadius: 8, backgroundColor: 'gray'}}>
        <Text>I am Overlay Content</Text>
      </Surface>
    ),
    [],
  )

  return (
    <Button
      onPress={() => {
        const id = show({
          type: 'popover',
          content: toastContent,
          onDismiss() {
            dismiss(id)
          },
          top: 250,
          left: 150,
          withBackdrop: true,
          disableBackgroundInteraction: true,
        })
      }}>
      Show Overlay
    </Button>
  )
}

export function OverlayUpdate() {
  const {show, update, dismiss} = useOverlay()
  const overlayId = useRef('')

  const toastContent = useMemo(
    () => (
      <Surface style={{padding: 16, borderRadius: 8, backgroundColor: 'gray'}}>
        <Text>I am Overlay Content</Text>
      </Surface>
    ),
    [],
  )

  return (
    <View>
      <Button
        onPress={() => {
          overlayId.current = show({
            type: 'popover',
            content: toastContent,
            top: 300,
            left: 100,
            withBackdrop: true,
            disableBackgroundInteraction: false,
          })
        }}>
        Show Overlay
      </Button>
      <Button
        onPress={() => {
          update(overlayId.current, {
            top: 100,
            left: 50,
          })
        }}>
        Update Overlay
      </Button>
      <Button onPress={() => dismiss(overlayId.current)}>Dismiss</Button>
    </View>
  )
}

export function OverlayRandom() {
  const {show, update, dismissLast, dismissAll} = useOverlay()

  const [autoCreate, setAutoCreate] = useState(false)
  const [disableBackgroundInteraction, setDisableBackgroundInteraction] =
    useState(false)

  const {width: screenWidth, height: screenHeight} = useWindowDimensions()

  const overlayId = useRef('')
  const intervalIdRef = useRef<NodeJS.Timeout>()

  const topRandom = useCallback(
    () => (Math.random() * screenHeight) / 2,
    [screenHeight],
  )
  const leftRandom = useCallback(
    () => (Math.random() * screenWidth) / 2,
    [screenWidth],
  )

  const toastContent = useMemo(
    () => (
      <Surface style={{padding: 16, borderRadius: 8, backgroundColor: 'gray'}}>
        <Text>I am Overlay Content</Text>
      </Surface>
    ),
    [],
  )

  const createOverlay = useCallback(() => {
    overlayId.current = show({
      type: 'popover',
      content: toastContent,
      top: topRandom(),
      left: leftRandom(),
      onDismiss() {
        disableBackgroundInteraction && dismissLast()
      },
      withBackdrop: true,
      disableBackgroundInteraction,
    })
  }, [
    disableBackgroundInteraction,
    dismissLast,
    leftRandom,
    show,
    toastContent,
    topRandom,
  ])

  useEffect(() => {
    if (!autoCreate) {
      clearInterval(intervalIdRef.current)
      return undefined
    }
    intervalIdRef.current = setInterval(() => {
      createOverlay()
    }, 2000)

    return () => clearInterval(intervalIdRef.current)
  }, [autoCreate, createOverlay])

  return (
    <View>
      <Checkbox
        label="Auto Create Overlay Every 2 Seconds"
        value={autoCreate}
        onValueChange={setAutoCreate}
      />
      <Checkbox
        label="Disable Background Interaction"
        value={disableBackgroundInteraction}
        onValueChange={setDisableBackgroundInteraction}
      />
      <Spacer />
      <Button onPress={createOverlay}>Show Overlay</Button>
      <Button
        onPress={() => {
          update(overlayId.current, {
            top: topRandom(),
            left: leftRandom(),
          })
        }}>
        Update Overlay
      </Button>
      <Button onPress={dismissAll}>Dismiss All</Button>
    </View>
  )
}
