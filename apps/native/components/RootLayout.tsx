import React, {PropsWithChildren, useState} from 'react'
import {BlossomThemeProvider, Icon} from '@react-native-blossom-ui/components'
import {StatusBar} from 'expo-status-bar'

import {TouchableOpacity} from 'react-native'
import lightTheme from '../themes/lightTheme.json'
import darkTheme from '../themes/darkTheme.json'
import options from '../themes/options.json'

export default function RootLayout({children}: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false)

  return (
    <BlossomThemeProvider
      theme={isDark ? darkTheme : lightTheme}
      isDark={isDark}
      options={options}>
      {children}
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
