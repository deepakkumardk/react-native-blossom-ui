import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {router} from 'expo-router'
import {Divider, Text, View} from '@react-native-blossom-ui/components'

export default function Page() {
  return (
    <View style={styles.container}>
      {dataList.map((item) => (
        <TouchableOpacity
          accessibilityRole="button"
          key={item.title}
          style={styles.item}
          onPress={() => router.push(item.navigateTo)}>
          <Text typography="h6">{item.title}</Text>
          <Divider style={{marginVertical: 12}} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  item: {
    paddingVertical: 0,
  },
})

const dataList = [
  {
    title: 'Text',
    navigateTo: './TextScreen',
  },
  {
    title: 'Button',
    navigateTo: './ButtonScreen',
  },
  {
    title: 'ActivityIndicator',
    navigateTo: './ActivityIndicatorScreen',
  },
  {
    title: 'TextInput',
    navigateTo: './TextInputScreen',
  },
  {
    title: 'SearchInput',
    navigateTo: './SearchInputScreen',
  },
  {
    title: 'Switch',
    navigateTo: './SwitchScreen',
  },
  {
    title: 'Avatar',
    navigateTo: './AvatarScreen',
  },
  {
    title: 'Icon',
    navigateTo: './IconScreen',
  },
]
