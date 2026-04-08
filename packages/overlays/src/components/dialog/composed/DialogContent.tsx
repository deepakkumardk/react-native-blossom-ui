import React from 'react'
import {View, ViewProps} from '@react-native-blossom-ui/components'

function DialogContent({children, ...rest}: ViewProps) {
  return (
    <View style={[{marginVertical: 12}, rest.style]} {...rest}>
      {children}
    </View>
  )
}

export default DialogContent
