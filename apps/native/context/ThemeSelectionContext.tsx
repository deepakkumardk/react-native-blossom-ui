import React, {createContext, useContext, useState, ReactNode} from 'react'
import lightTheme from '../lightTheme.json'
import darkTheme from '../darkTheme.json'
import {
  lightBlue,
  darkBlue,
  lightCharcoal,
  darkCharcoal,
  lightIndigo,
  darkIndigo,
  lightPlum,
  darkPlum,
  lightTeal,
  darkTeal,
  lightLilac,
  darkLilac,
  lightBrown,
  darkBrown,
  lightGreen,
  darkGreen,
  lightSteel,
  darkSteel,
  lightPurple,
  darkPurple,
  lightObsidian,
  darkObsidian,
  lightOcean,
  darkOcean,
} from '../themes'

import type {BlossomThemeColors} from '@react-native-blossom-ui/components'

const themes: Record<
  string,
  {light: BlossomThemeColors; dark: BlossomThemeColors}
> = {
  blue: {light: lightBlue, dark: darkBlue},
  charcoal: {light: lightCharcoal, dark: darkCharcoal},
  indigo: {light: lightIndigo, dark: darkIndigo},
  plum: {light: lightPlum, dark: darkPlum},
  teal: {light: lightTeal, dark: darkTeal},
  electricLilac: {light: lightLilac, dark: darkLilac},
  brown: {light: lightBrown, dark: darkBrown},
  mossGreen: {light: lightGreen, dark: darkGreen},
  steelBlue: {light: lightSteel, dark: darkSteel},
  purple: {light: lightPurple, dark: darkPurple},
  obsidian: {light: lightObsidian, dark: darkObsidian},
  oceanBlue: {light: lightOcean, dark: darkOcean},
  default: {light: lightTheme, dark: darkTheme},
}

type ThemeSelectionType = keyof typeof themes

//
type ThemeSelectionContextType = {
  theme: BlossomThemeColors
  isDark: boolean
  themeSelectionType: ThemeSelectionType
  setThemeSelectionType: (type: ThemeSelectionType) => void
  toggleDarkMode: () => void
}

const ThemeSelectionContext = createContext<
  ThemeSelectionContextType | undefined
>(undefined)

/**
 * ThemeSelectionProvider component provides the theme context to the app.
 * It allows selecting different themes and toggling dark mode.
 */
export const ThemeSelectionProvider = ({children}: {children: ReactNode}) => {
  const [themeSelectionType, setThemeSelectionType] =
    useState<ThemeSelectionType>('default')
  const [isDark, setIsDark] = useState(false)

  const setThemeSelection = (type: ThemeSelectionType) =>
    setThemeSelectionType(type)
  const toggleDarkMode = () => setIsDark((prev) => !prev)

  const theme: BlossomThemeColors =
    themes[themeSelectionType][isDark ? 'dark' : 'light']

  return (
    <ThemeSelectionContext.Provider
      value={{
        theme,
        isDark,
        themeSelectionType,
        setThemeSelectionType: setThemeSelection,
        toggleDarkMode,
      }}>
      {children}
    </ThemeSelectionContext.Provider>
  )
}
export {themes}

export const useAppTheme = () => {
  const ctx = useContext(ThemeSelectionContext)

  if (!ctx)
    throw new Error('useAppTheme must be used inside ThemeSelectionProvider')
  return ctx
}
