import React, {useMemo, ReactNode, useEffect} from 'react'
import {createOverlayController} from './OverlayController'
import OverlayHost from './OverlayHost'
import {OverlayContext} from './OverlayContext'
import {OverlayContextValue} from './types'
import {overlayBridge} from './overlayBridge'

function OverlayProvider({children}: {children: ReactNode}) {
  const contextValue: OverlayContextValue = useMemo(
    () => createOverlayController(),
    [],
  )

  useEffect(() => {
    if (__DEV__ && overlayBridge.controller) {
      console.warn(
        'Multiple OverlayProvider instances detected. Only one should be mounted.',
      )
    }

    overlayBridge.controller = contextValue

    return () => {
      overlayBridge.controller = undefined
    }
  }, [contextValue])

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}

      <OverlayHost />
    </OverlayContext.Provider>
  )
}

export default OverlayProvider
