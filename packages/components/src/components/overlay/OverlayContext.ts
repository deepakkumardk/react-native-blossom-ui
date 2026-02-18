import {createContext} from 'react'
import {OverlayManagerProps} from './OverlayManager'

export type OverlayContextValue = OverlayManagerProps

export const OverlayContext = createContext<OverlayContextValue | null>(null)
