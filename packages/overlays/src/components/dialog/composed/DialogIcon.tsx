import React from 'react'
import {View, ViewProps} from '@react-native-blossom-ui/components'

function DialogIcon({children, ...rest}: ViewProps) {
  return (
    <View
      style={[{marginBottom: 12, alignItems: 'center'}, rest.style]}
      {...rest}>
      {children}
    </View>
  )
}

export default DialogIcon
