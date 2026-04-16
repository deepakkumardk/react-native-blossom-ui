import React from 'react'
import {View, ViewProps} from '@react-native-blossom-ui/components'

function DialogActions({children, ...rest}: ViewProps) {
  return (
    <View
      style={[{flexDirection: 'row', justifyContent: 'flex-end'}, rest.style]}
      {...rest}>
      {children}
    </View>
  )
}

export default DialogActions
