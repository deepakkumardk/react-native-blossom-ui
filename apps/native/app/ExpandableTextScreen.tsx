import React from 'react'

import {
  ExpandableTextUsage,
  ExpandableTextLines,
  ExpandableTextLessLines,
  ExpandableTextLabelCustom,
} from '@react-native-blossom-ui/showcase'

import {Heading, AppScrollView} from '../components'

export default function ExpandableTextScreen() {
  return (
    <AppScrollView>
      <Heading>Usage</Heading>
      <ExpandableTextUsage />

      <Heading>With Less Lines</Heading>
      <ExpandableTextLessLines />

      <Heading>With overflow texts</Heading>
      <ExpandableTextLines />

      <Heading>Label Text</Heading>
      <ExpandableTextLabelCustom />
    </AppScrollView>
  )
}
