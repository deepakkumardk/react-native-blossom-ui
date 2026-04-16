import {createContext} from 'react'
import {OverlayContextValue} from './types'

export const OverlayContext = createContext<OverlayContextValue | null>(null)
