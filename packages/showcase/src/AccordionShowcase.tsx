import React from 'react'

import {Accordion, Icon, Text, View} from '@react-native-blossom-ui/components'

export function AccordionUsage() {
  return (
    <View>
      <Accordion
        title="Hello world"
        subtitle="Hello world!"
        description="Lorem Ipsum"
      />
    </View>
  )
}

export function AccordionCustom() {
  return (
    <View>
      <Accordion
        title={
          <Text status="success" typography="h6">
            Hello
          </Text>
        }
        subtitle={
          <Text status="error" typography="c2">
            Click to know more
          </Text>
        }
        left={<Icon name="home" />}>
        <Text status="info">You are certainly not spammed!!</Text>
      </Accordion>
    </View>
  )
}
