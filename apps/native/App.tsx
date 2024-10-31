import React, {useState} from 'react'
import {StyleSheet, Switch} from 'react-native'
import {StatusBar} from 'expo-status-bar'

import {
  Button,
  BlossomThemeProvider,
  View,
  Text,
  useBlossomTheme,
} from '@react-native-blossom-ui/components'

import lightTheme from './lightTheme.json'
import darkTheme from './darkTheme.json'

export function Native({onPress}: {onPress: () => void}) {
  const {colors, isDark} = useBlossomTheme()

  return (
    <View style={styles.container}>
      <Switch value={isDark} onValueChange={() => onPress()} />
      <Text typography="h1">Native</Text>
      <Text style={[styles.header, {backgroundColor: colors.background500}]}>
        Native
      </Text>

      <Button
        onPress={() => {
          console.log('Native -> onPress')
        }}
        text="Blossom Button"
      />
      <Button status="accent">Blossom Button UI</Button>

      <Button
        style={{
          backgroundColor: 'green',
        }}
        text="Click Me">
        <Text>With Children</Text>
      </Button>
      <StatusBar style={!isDark ? 'dark' : 'light'} />
    </View>
  )
}

export default function Container() {
  const [isDark, setIsDark] = useState(false)

  return (
    <BlossomThemeProvider
      theme={isDark ? darkTheme : lightTheme}
      isDark={isDark}>
      <Native
        onPress={() => {
          setIsDark((prev) => !prev)
        }}
      />
    </BlossomThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 46,
  },
})
