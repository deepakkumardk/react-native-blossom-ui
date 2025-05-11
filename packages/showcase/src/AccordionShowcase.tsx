import React, {useCallback} from 'react'

import {Accordion, Icon, Text, View} from '@react-native-blossom-ui/components'

export function AccordionUsage() {
  return (
    <View>
      <Accordion
        title="Hello from Accordion"
        description="Hello from Blossom UI"
        content={'Lorem Ipsum '.repeat(20)}
      />
    </View>
  )
}

export function AccordionCustom() {
  const ChevronView = useCallback(
    (isOpen: boolean) => <Text typography="h3">{isOpen ? '🙃' : '🙂'}</Text>,
    [],
  )

  return (
    <View>
      <Accordion
        title={
          <Text status="success" typography="h6">
            Hello
          </Text>
        }
        description={
          <Text status="accent" typography="c2">
            Click to know more
          </Text>
        }
        left={<Icon name="home" />}
        chevron={ChevronView}>
        <Text status="info">You are certainly not spammed!!</Text>
      </Accordion>
    </View>
  )
}
