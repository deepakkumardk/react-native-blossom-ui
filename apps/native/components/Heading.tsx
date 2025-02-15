import {Children, Text} from '@react-native-blossom-ui/components'
import React from 'react'

export const Heading = ({children}: Children) => {
  return (
    <Text typography="h6" status="accent" style={{marginVertical: 8}}>
      {children}
    </Text>
  )
}
