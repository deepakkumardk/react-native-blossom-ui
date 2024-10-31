import React, {createContext, useCallback, useContext, useMemo} from 'react'
import {
  BlossomContext,
  BlossomThemeColors,
  BlossomThemeProviderProps,
} from './types'

const defaultValue: BlossomContext = {
  colors: {} as BlossomThemeColors,
  isDark: false,
}

export const BlossomThemeContext = createContext<BlossomContext>(defaultValue)

export const BlossomThemeProvider = ({
  theme,
  isDark,
  children,
}: BlossomThemeProviderProps) => {
  const values =
    //  useCallback(
    //   () => (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    {
      colors: theme,
      isDark,
    }
  // ),
  //   [theme, isDark],
  // )

  return (
    <BlossomThemeContext.Provider value={values}>
      {children}
    </BlossomThemeContext.Provider>
  )
}

export const useBlossomTheme = () => useContext(BlossomThemeContext)
