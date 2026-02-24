import React, {useContext, useEffect, useState} from 'react'
import {View, StyleSheet, BackHandler} from 'react-native'

import {OverlayNode} from '../types'
import {OverlayContext} from './OverlayContext'
import OverlayContainer from './OverlayContainer'

function OverlayHost() {
  const manager = useContext(OverlayContext)

  const [overlays, setOverlays] = useState<OverlayNode[]>([])

  useEffect(() => {
    const unsubscribe = manager?.subscribe(() => {
      setOverlays([...(manager?.getState() ?? [])])
    })
    return () => {
      unsubscribe?.()
    }
  }, [manager])

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!overlays.length) return false

        const top = overlays[overlays.length - 1]

        if (top.dismissOnBackPress) {
          manager?.dismiss(top.id)
          return true
        }

        return false
      },
    )

    return () => subscription.remove()
  }, [overlays, manager])

  if (!manager) {
    if (__DEV__) {
      console.error(
        'OverlayHost must be used within an OverlayContextProvider.',
      )
    }
    return null
  }

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
      collapsable={false}>
      {overlays.map((node, index) => (
        <OverlayContainer key={node.id} node={node} stackIndex={index} />
      ))}
    </View>
  )
}

export default OverlayHost
