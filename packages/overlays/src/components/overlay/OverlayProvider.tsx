import React, {useMemo, ReactNode} from 'react'
import {createOverlayManager} from './OverlayManager'
import OverlayHost from './OverlayHost'
import {OverlayContext} from './OverlayContext'
import {OverlayContextValue} from '../../types'

function OverlayProvider({children}: {children: ReactNode}) {
  const contextValue: OverlayContextValue = useMemo(
    () => createOverlayManager(),
    [],
  )

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}

      <OverlayHost />
    </OverlayContext.Provider>
  )
}

export default OverlayProvider
