import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useWindowDimensions} from 'react-native'

import {
  View,
  Button,
  Text,
  Surface,
  Checkbox,
  Spacer,
  SegmentedButton,
} from '@react-native-blossom-ui/components'
import {Overlay, useOverlay} from '@react-native-blossom-ui/overlays'

export function OverlayUsage() {
  const {show} = useOverlay()

  const overlayContent = useMemo(
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
        show({
          type: 'popover',
          content: overlayContent,
          top: 250,
          left: 150,
          withBackdrop: true,
          backdropBehavior: 'dismiss',
          dismissOnBackPress: true,
          backdropStyle: {backgroundColor: 'rgba(0,0,0,0.25)'},
        })
      }}>
      Show Overlay
    </Button>
  )
}

export function OverlayBackdropBehavior() {
  const {show, dismiss} = useOverlay()
  const overlayId = useRef('')
  const [backdropBehavior, setBackdropBehavior] = useState<
    'interactive' | 'block' | 'dismiss'
  >('interactive')

  const overlayContent = useMemo(
    () => (
      <Surface style={{padding: 16, borderRadius: 8, backgroundColor: 'gray'}}>
        <Text>I am Overlay Content</Text>
        <Button onPress={() => dismiss(overlayId.current)}>Close</Button>
      </Surface>
    ),
    [dismiss],
  )

  return (
    <>
      <SegmentedButton
        data={[{title: 'interactive'}, {title: 'block'}, {title: 'dismiss'}]}
        onPress={(value, i) => {
          setBackdropBehavior(value as 'interactive' | 'block' | 'dismiss')
        }}
      />
      <Button
        onPress={() => {
          overlayId.current = show({
            type: 'popover',
            content: overlayContent,
            top: 250,
            left: 150,
            withBackdrop: true,
            backdropBehavior,
          })
        }}>
        Show Overlay
      </Button>
    </>
  )
}

export function OverlayDuration() {
  const {show} = useOverlay()

  const overlayContent = useMemo(
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
        show({
          type: 'popover',
          content: overlayContent,
          top: 250,
          left: 150,
          withBackdrop: true,
          backdropBehavior: 'dismiss',
          duration: 2000,
        })
      }}>
      Show Auto Hide Overlay
    </Button>
  )
}

export function OverlayUpdate() {
  const {show, update, dismiss} = useOverlay()
  const overlayId = useRef('')

  const overlayContent = useMemo(
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
            content: overlayContent,
            top: 300,
            left: 100,
            withBackdrop: true,
            backdropBehavior: 'interactive',
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
  // using scope to automatically dismiss overlays on unmount
  const scopeId = useOverlayScope()
  const {show, update, dismissAll} = useOverlay()

  const [autoCreate, setAutoCreate] = useState(false)
  const [disableBackgroundInteraction, setDisableBackgroundInteraction] =
    useState(false)

  const {width: screenWidth, height: screenHeight} = useWindowDimensions()

  const overlayId = useRef('')
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  )

  const topRandom = useCallback(
    () => (Math.random() * screenHeight) / 2,
    [screenHeight],
  )
  const leftRandom = useCallback(
    () => (Math.random() * screenWidth) / 2,
    [screenWidth],
  )

  const overlayContent = useMemo(
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
      scope: scopeId,
      content: overlayContent,
      top: topRandom(),
      left: leftRandom(),
      withBackdrop: true,
      backdropBehavior: disableBackgroundInteraction
        ? 'dismiss'
        : 'interactive',
      dismissOnBackPress: true,
    })
  }, [
    show,
    scopeId,
    overlayContent,
    topRandom,
    leftRandom,
    disableBackgroundInteraction,
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

export function OverlayImperativeAPI() {
  const overlayContent = useMemo(
    () => (
      <Surface style={{padding: 16, borderRadius: 8, backgroundColor: 'teal'}}>
        <Text>I am shown from the Overlay Imperative API</Text>
        <Button onPress={() => Overlay.dismissLast()}>Close</Button>
      </Surface>
    ),
    [],
  )

  return (
    <Button
      onPress={() => {
        Overlay.show({
          type: 'popover',
          content: overlayContent,
          top: 550,
          left: 10,
          withBackdrop: true,
          backdropBehavior: 'dismiss',
          dismissOnBackPress: true,
          backdropStyle: {backgroundColor: 'rgba(0,0,0,0.25)'},
        })
      }}>
      Show Overlay
    </Button>
  )
}

export function useOverlayScope() {
  const scopeId = useId()

  useEffect(() => {
    return () => {
      Overlay.dismissScope(scopeId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return scopeId
}
