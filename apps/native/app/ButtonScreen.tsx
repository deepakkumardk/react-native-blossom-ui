import React from 'react'
import {Alert, ScrollView, StyleSheet} from 'react-native'

import {Text, View, Button, Icon} from '@react-native-blossom-ui/components'
import {BUTTON_MODES, SIZE_LIST, STATUS_LIST} from '../lib/constants'
import {Heading} from '../components'

export default function ButtonScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Heading>Sizes</Heading>
        <View style={styles.row}>
          {SIZE_LIST.map((value) => (
            <Button key={value} size={value} style={styles.button}>
              {value}
            </Button>
          ))}
        </View>

        <Heading>Icon & Modes</Heading>
        {BUTTON_MODES.map((modeValue) => (
          <View key={modeValue} style={styles.row}>
            {SIZE_LIST.map((value) => (
              <Button
                key={value}
                size={value}
                mode={modeValue}
                style={[styles.button]}
                // disabled
                // isLoading
                left={<Icon name="add" size={16} />}
              />
            ))}
          </View>
        ))}

        <Heading>Modes & Sizes</Heading>

        {BUTTON_MODES.map((modeValue) => (
          <View key={modeValue} style={styles.row}>
            {SIZE_LIST.map((sizeValue) => (
              <Button
                key={modeValue + sizeValue}
                size={sizeValue}
                mode={modeValue}
                style={styles.button}>
                {modeValue}
              </Button>
            ))}
          </View>
        ))}

        <Heading>Statuses</Heading>

        <View style={styles.row}>
          {BUTTON_MODES.map((value) => (
            <Heading key={value}>{value}</Heading>
          ))}
        </View>

        {STATUS_LIST.map((status) => (
          <View key={status} style={styles.row}>
            {BUTTON_MODES.map((modeValue) => (
              <Button
                key={modeValue}
                mode={modeValue}
                status={status}
                size="small"
                style={styles.button}>
                {status}
              </Button>
            ))}
          </View>
        ))}

        <Heading>Disabled</Heading>

        {STATUS_LIST.map((status) => (
          <View key={status} style={styles.row}>
            {BUTTON_MODES.map((modeValue) => (
              <Button
                key={modeValue}
                mode={modeValue}
                status={status}
                size="small"
                disabled
                style={styles.button}>
                {status}
              </Button>
            ))}
          </View>
        ))}

        <Heading>Custom</Heading>
        <Button
          loaderStyle={{
            color: 'black',
          }}
          isLoading
          left={<Icon name="add" size={24} color="white" />}
          right={<Icon name="add" size={24} color="white" />}
          style={[styles.button, {width: '100%', backgroundColor: 'green'}]}
          onPress={() => Alert.alert('Hello')}>
          Prefix <Text status="error">Text Children</Text> Suffix
        </Button>

        <View style={styles.row}>
          <Button isLoading style={styles.button}>
            Loading...
          </Button>
        </View>
        <View style={styles.row}>
          {BUTTON_MODES.map((value) => (
            <Button
              key={value}
              mode={value}
              style={[styles.button, {backgroundColor: 'cyan'}]}
              left={<Icon name="add" size={16} color="white" />}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginVertical: 4,
  },
})
