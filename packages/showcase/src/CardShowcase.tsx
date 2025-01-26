import React from 'react'
import {Image} from 'react-native'

import {Card, Text} from '@react-native-blossom-ui/components'

export function CardUsage() {
  return (
    <Card>
      <Card.Cover>
        <Image
          accessibilityIgnoresInvertColors
          source={{
            uri: 'https://picsum.photos/200/300?random=1',
          }}
          resizeMode="cover"
          style={{width: '100%', height: 160}}
        />
      </Card.Cover>

      <Card.Content>
        <Text typography="h6">Card Title</Text>
        <Text typography="b2">Card Subtitle</Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </Text>
      </Card.Content>
    </Card>
  )
}
