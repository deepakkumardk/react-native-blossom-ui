import React, {useState} from 'react'
import {
  BlossomThemeProvider,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

import lightTheme from '../lightTheme.json'
import darkTheme from '../darkTheme.json'

export default function Layout() {
  const [isDark, setIsDark] = useState(false)

  return (
    <BlossomThemeProvider
      theme={isDark ? darkTheme : lightTheme}
      isDark={isDark}>
      <Container />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </BlossomThemeProvider>
  )
}

export const Container = () => {
  const {colors} = useBlossomTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary600 || 'red',
        },
        headerTintColor: colors.bgLight100,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route. */}
    </Stack>
  )
}
