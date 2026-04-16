import React from 'react'
import {Text, TextProps} from '@react-native-blossom-ui/components'

function DialogTitle({children, ...rest}: TextProps) {
  return (
    <Text typography="h6" {...rest} style={[{textAlign: 'center'}, rest.style]}>
      {children}
    </Text>
  )
}

export default DialogTitle
