import React from 'react'

import {ExpandableText, View} from '@react-native-blossom-ui/components'

export function ExpandableTextUsage() {
  return (
    <View>
      <ExpandableText>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </ExpandableText>
    </View>
  )
}

export function ExpandableTextLessLines() {
  return (
    <View>
      <ExpandableText numberOfLines={5}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum is for texts.
      </ExpandableText>
    </View>
  )
}

export function ExpandableTextLines() {
  return (
    <View>
      <ExpandableText numberOfLines={5}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </ExpandableText>
    </View>
  )
}
