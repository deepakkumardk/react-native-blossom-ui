import React from 'react'

import {View, Link, Text} from '@react-native-blossom-ui/components'

export function LinkUsage() {
  return (
    <View>
      <Link
        title="View Docs"
        href="https://docs-react-native-blossom-ui.vercel.app/"
      />
    </View>
  )
}

export function LinkWithText() {
  return (
    <View>
      <Link
        leftText="Explore"
        title="Documentation"
        rightText="of Blossom UI"
        href="https://docs-react-native-blossom-ui.vercel.app/"
      />
      <Link
        leftText="Don't have an account?"
        title="Create Account"
        href="https://google.com"
      />
      <Link
        title="Click here"
        rightText="to view more"
        href="https://google.com"
      />
    </View>
  )
}

export function LinkCustom() {
  return (
    <View>
      <Link
        leftText={<Text status="warning">Awesome</Text>}
        rightText={<Text status="success">Library</Text>}
        title="Blossom UI"
        href="https://docs-react-native-blossom-ui.vercel.app/"
        style={{
          color: 'blue',
        }}
      />
    </View>
  )
}
