import React, {useEffect, useState} from 'react'
import {
  BlossomThemeProvider,
  ComponentManager,
  Icon,
  useBlossomTheme,
  AvatarProps,
} from '@react-native-blossom-ui/components'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

import {TouchableOpacity} from 'react-native'
import * as Font from 'expo-font'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
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
      <TouchableOpacity
        accessibilityRole="button"
        style={{
          position: 'absolute',
          bottom: 0,
          end: 0,
          padding: 40,
        }}
        onPress={() => setIsDark((prev) => !prev)}>
        <Icon name="contrast" size={40} />
      </TouchableOpacity>
    </BlossomThemeProvider>
  )
}

export const Container = () => {
  const {colors} = useBlossomTheme()

  React.useEffect(() => {
    void Font.loadAsync({...Ionicons.font, ...MaterialCommunityIcons.font})
  }, [])

  useEffect(() => {
    ComponentManager.setDefaultProps({
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
        }
      },
      SegmentedButton(props, theme) {
        return {
          style: {
            marginVertical: 8,
          },
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
          style: {
            marginVertical: 8,
          },
        }
      },
      Button(props, theme) {
        return {
          style: {
            marginVertical: 2,
          },
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
      {/* Optionally configure static options outside the route. */}
      <Stack.Screen name="index" options={{title: 'Blossom UI'}} />
    </Stack>
  )
}
