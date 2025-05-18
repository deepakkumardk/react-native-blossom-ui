import React, {createContext, useContext, useMemo} from 'react'

import {
  BlossomContext,
  BlossomThemeColors,
  BlossomThemeProviderProps,
  BlossomUIOptions,
  safeDeepMerge,
} from '../common'
import {typographyStyle} from '../components/text/typography'
import defaultLightTheme from './defaultLightTheme.json'
import defaultDarkTheme from './defaultDarkTheme.json'

const defaultValue: BlossomContext = {
  colors: defaultLightTheme,
  isDark: false,
  options: {
    borderRadius: 12,
    typography: typographyStyle,
  },
}

const BlossomThemeContext = createContext<BlossomContext>(defaultValue)

export const BlossomThemeProvider = ({
  theme = defaultLightTheme,
  isDark,
  options,
  children,
}: BlossomThemeProviderProps) => {
  const values = useMemo(
    () => ({
      colors: safeDeepMerge<BlossomThemeColors>(
        isDark ? defaultDarkTheme : defaultLightTheme,
        theme,
      ),
      isDark,
      options: safeDeepMerge<BlossomUIOptions>(
        defaultValue.options || {},
        options || {},
      ),
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
