import React from 'react'
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import {router} from 'expo-router'
import {Divider, Text, View} from '@react-native-blossom-ui/components'

export default function Page() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {dataList
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((item) => (
            <TouchableOpacity
              accessibilityRole="button"
              key={item.title}
              style={styles.item}
              onPress={() => router.push(item.navigateTo)}>
              <Text typography="h6">{item.title}</Text>
              <Divider style={{marginVertical: 8}} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  item: {
    paddingVertical: 2,
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
    title: 'Chip',
    navigateTo: './ChipScreen',
  },
  {
    title: 'Card',
    navigateTo: './CardScreen',
  },
  {
    title: 'Divider',
    navigateTo: './DividerScreen',
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
    title: 'Checkbox',
    navigateTo: './CheckboxScreen',
  },
  {
    title: 'Radio',
    navigateTo: './RadioScreen',
  },
  {
    title: 'Avatar',
    navigateTo: './AvatarScreen',
  },
  {
    title: 'Icon',
    navigateTo: './IconScreen',
  },
  {
    title: 'Popover',
    navigateTo: './PopoverScreen',
  },
  {
    title: 'Tooltip',
    navigateTo: './TooltipScreen',
  },
  {
    title: 'Modal',
    navigateTo: './ModalScreen',
  },
  {
    title: 'Select',
    navigateTo: './SelectScreen',
  },
  {
    title: 'MultiSelect',
    navigateTo: './MultiSelectScreen',
  },
]
