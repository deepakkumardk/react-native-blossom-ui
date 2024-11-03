import React, {useEffect, useState} from 'react'
import {
  BlossomThemeProvider,
  ComponentManager,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

import lightTheme from '../lightTheme.json'
import darkTheme from '../darkTheme.json'
import options from '../options.json'

export default function Layout() {
  const [isDark, setIsDark] = useState(false)

  return (
    <BlossomThemeProvider
      theme={isDark ? darkTheme : lightTheme}
      isDark={isDark}
      options={options}>
      <Container />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </BlossomThemeProvider>
  )
}

export const Container = () => {
  const {colors} = useBlossomTheme()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ComponentManager.setDefaultProps({
      Switch: {
        size: 'small',
        status: 'accent',
      },
      Avatar: {
        size: 'large',
        status: 'accent',
      },
    })
  }, [])

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
