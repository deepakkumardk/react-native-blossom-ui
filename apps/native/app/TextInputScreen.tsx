import React, {useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {
  View,
  TextInput,
  useBlossomTheme,
  Text,
} from '@react-native-blossom-ui/components'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {SIZE_LIST, STATUS_LIST} from '../lib/constants'
import {Heading} from '../components'

export default function TextInputScreen() {
  const {colors} = useBlossomTheme()
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Modes</Heading>

        <TextInput
          accessibilityLabel="Text input field"
          label="Outlined Field"
          placeholder="First name"
          error={text.length < 3 ? 'Please enter a valid name' : ''}
          containerStyle={styles.input}
          value={text}
          onChangeText={setText}
          mode="outlined"
          left={
            <MaterialCommunityIcons
              name="cancel"
              size={24}
              color={colors.background800}
            />
          }
          right={
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={colors.background800}
            />
          }
        />
        <TextInput
          accessibilityLabel="Text input field"
          label="Flat Input"
          placeholder="Last name"
          mode="flat"
          containerStyle={styles.input}
        />
        <Text typography="h6">Sizes</Text>
        {SIZE_LIST.map((size) => (
          <TextInput
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
          <TextInput
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
