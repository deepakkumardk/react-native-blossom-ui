import React, {useContext, useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'

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
        // <View
        //   key={node.id}
        //   style={{
        //     position: 'absolute',
        //     top: node.top,
        //     left: node.left,
        //     backgroundColor: 'green',
        //     padding: 18,
        //   }}>
        <OverlayContainer key={node.id} node={node} stackIndex={index} />
        // </View>
      ))}
    </View>
  )
}

export default OverlayHost
