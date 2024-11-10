import React, {useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {
  View,
  SearchInput,
  useBlossomTheme,
  Text,
} from '@react-native-blossom-ui/components'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {SIZE_LIST, STATUS_LIST} from '../lib/constants'
import {Heading} from '../components'

export default function SearchInputScreen() {
  const {colors} = useBlossomTheme()

  const [query, setQuery] = useState('')

  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Modes</Heading>

        <Text>Searching For: {query}</Text>
        <SearchInput
          accessibilityLabel="Text input field"
          // label="Search"
          placeholder="Search Name"
          containerStyle={styles.input}
          onQueryChange={setQuery}
          mode="outlined"
          left={
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={colors.background800}
            />
          }
        />
        <SearchInput
          accessibilityLabel="Text input field"
          label="Flat Input"
          placeholder="Last name"
          mode="flat"
          containerStyle={styles.input}
        />
        <Text typography="h6">Sizes</Text>
        {SIZE_LIST.map((size) => (
          <SearchInput
            accessibilityLabel="Text input field"
            key={size}
            size={size}
            label={`Label ${size}`}
            placeholder={size}
            caption={`${size} caption`}
            containerStyle={styles.input}
            error="Error Text here"
            mode="outlined"
          />
        ))}

        <Text typography="h6">Statuses</Text>
        {STATUS_LIST.map((status) => (
          <SearchInput
            accessibilityLabel="Text input field"
            key={status}
            status={status}
            label={`Label ${status}`}
            placeholder={status}
            caption={`${status} caption`}
            containerStyle={styles.input}
            mode="outlined"
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
})
