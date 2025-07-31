import React, {useEffect} from 'react'
import {
  BlossomThemeProvider,
  ComponentManager,
  Icon,
  useBlossomTheme,
  AvatarProps,
  SwitchProps,
} from '@react-native-blossom-ui/components'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import {TouchableOpacity} from 'react-native'

import options from '../options.json'
import {ThemeSelectionProvider, useAppTheme} from '../context'

export default function Layout() {
  return (
    <ThemeSelectionProvider>
      <AppLayout />
    </ThemeSelectionProvider>
  )
}

function AppLayout() {
  const {theme, isDark, toggleDarkMode} = useAppTheme()

  return (
    <BlossomThemeProvider theme={theme} isDark={isDark} options={options}>
      <Container />
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <TouchableOpacity
        accessibilityRole="button"
        style={{
          position: 'absolute',
          bottom: 0,
          end: 0,
          margin: 40,
          borderRadius: 100,
        }}
        onPress={toggleDarkMode}>
        <Icon name="contrast" size={40} />
      </TouchableOpacity>
    </BlossomThemeProvider>
  )
}

export const Container = () => {
  const {colors} = useBlossomTheme()

  useEffect(() => {
    ComponentManager.setDefaultProps({
      Switch: (props: SwitchProps, theme) => ({
        size: 'medium',
        status: 'accent',
      }),
      Avatar: (props: AvatarProps, theme) => {
        if (props.size === 'small') {
          return {
            style: {
              backgroundColor: theme.colors.success900,
            },
          }
        }
        return {
          size: 'medium',
          status: 'primary',
          mode: 'round',
        }
      },
      SegmentedButton(props, theme) {
        return {
          style: {marginVertical: 8},
        }
      },
      Chip(props, theme) {
        return {
          withCheckIcon: true,
          marginVertical: 2,
        }
      },
      ProgressBar(props, theme) {
        return {
          style: {marginVertical: 8},
        }
      },
      Button(props, theme) {
        return {
          style: {marginVertical: 2},
        }
      },
    })
  }, [])

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary600,
        },
        headerTintColor: colors.bgLight100,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{title: 'Blossom UI '}} />
    </Stack>
  )
}
