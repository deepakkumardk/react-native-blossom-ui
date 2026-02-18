import React from 'react'
import {BlossomThemeProvider} from '../context/BlossomThemeProvider'
import {BlossomThemeProviderProps} from '../common'
import OverlayProvider from '../components/overlay/OverlayProvider'

export const BlossomProvider = ({
  children,
  ...themeProps
}: BlossomThemeProviderProps) => {
  return (
    <BlossomThemeProvider {...themeProps}>
      {/* <PortalProvider> */}
      <OverlayProvider>{children}</OverlayProvider>
      {/* </PortalProvider> */}
    </BlossomThemeProvider>
  )
}
