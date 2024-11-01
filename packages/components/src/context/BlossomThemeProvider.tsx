import React, {createContext, useContext, useMemo} from 'react'
import deepmerge from 'deepmerge'
import {
  BlossomContext,
  BlossomThemeColors,
  BlossomThemeProviderProps,
} from '../types'
import {typographyStyle} from '../components/text/typography'

const defaultValue: BlossomContext = {
  colors: {} as BlossomThemeColors,
  isDark: false,
  options: {
    borderRadius: 12,
    typography: typographyStyle,
  },
}

const BlossomThemeContext = createContext<BlossomContext>(defaultValue)

export const BlossomThemeProvider = ({
  theme,
  isDark,
  options,
  children,
}: BlossomThemeProviderProps) => {
  const values = useMemo(
    () => ({
      colors: theme,
      isDark,
      options: deepmerge(defaultValue.options || {}, options || {}),
    }),
    [theme, isDark, options],
  )

  return (
    <BlossomThemeContext.Provider value={values}>
      {children}
    </BlossomThemeContext.Provider>
  )
}

export const useBlossomTheme = () => useContext(BlossomThemeContext)
