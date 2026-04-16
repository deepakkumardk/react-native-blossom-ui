import {useContext} from 'react'
import {Overlay} from './Overlay'
import {OverlayContext} from './OverlayContext'
import {OverlayActions} from './types'

export const useOverlay = (): OverlayActions => {
  const manager = useContext(OverlayContext)

  if (!manager) {
    throw new Error('useOverlay must be used within <OverlayProvider>')
  }

  return Overlay
}
