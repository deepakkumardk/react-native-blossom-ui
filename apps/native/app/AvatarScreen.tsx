import React from 'react'
import {StyleSheet} from 'react-native'
import {View, Avatar} from '@react-native-blossom-ui/components'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {Heading} from '../components'
import {SIZE_LIST, STATUS_LIST} from '../lib/constants'

const imgSrc = {
  uri: 'https://picsum.photos/200/300?random=1',
}

export default function AvatarScreen() {
  return (
    <View style={styles.container}>
      <Heading>Sizes</Heading>
      <View style={styles.row}>
        {SIZE_LIST.map((size) => (
          <Avatar size={size} source={imgSrc} style={styles.image} />
        ))}
      </View>
      <View style={styles.row}>
        {SIZE_LIST.map((size) => (
          <Avatar
            size={size}
            // source={imgSrc}
            // eslint-disable-next-line react/no-unstable-nested-components
            icon={(sizeValue: number) => (
              <MaterialCommunityIcons
                name="account"
                size={sizeValue}
                color="white"
              />
            )}
            style={styles.image}
          />
        ))}
      </View>

      <Heading>Modes</Heading>
      <View style={styles.row}>
        <Avatar mode="circle" source={imgSrc} style={styles.image} />
        <Avatar mode="round" source={imgSrc} style={styles.image} />
        <Avatar mode="square" source={imgSrc} style={styles.image} />
      </View>

      <Heading>Statuses</Heading>
      <View style={styles.row}>
        {STATUS_LIST.map((size) => (
          <Avatar
            size="small"
            status={size}
            // source={imgSrc}
            // eslint-disable-next-line react/no-unstable-nested-components
            icon={(sizeValue: number) => (
              <MaterialCommunityIcons
                name="account"
                size={sizeValue}
                color="white"
              />
            )}
            initials=""
            style={styles.image}
          />
        ))}
      </View>

      <Heading>Custom Size with Auto font</Heading>
      <View style={styles.row}>
        <Avatar size={48} source={imgSrc} style={styles.image} />
        <Avatar size={60} style={styles.image} initials="AB" status="error" />
        <Avatar
          size={120}
          style={styles.image}
          initials="C"
          status="primary"
          initialStyle={{
            color: 'blue',
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    margin: 6,
  },
})
