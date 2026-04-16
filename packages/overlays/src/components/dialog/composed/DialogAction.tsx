import React from 'react'

import {Button, ButtonProps} from '@react-native-blossom-ui/components'

function DialogAction({children, ...rest}: ButtonProps) {
  return (
    <Button mode="plain" {...rest}>
      {children}
    </Button>
  )
}

export default DialogAction
