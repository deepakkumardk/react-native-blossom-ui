import React from 'react'

import {Card, Text} from '@react-native-blossom-ui/components'

export function CardUsage() {
  return (
    <Card>
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
