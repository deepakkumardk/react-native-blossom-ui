import React from 'react'

import {Surface, Button} from '@react-native-blossom-ui/components'

export function SurfaceUsage() {
  return (
    <Surface>
      <Button title="Child Components" />
    </Surface>
  )
}

export function SurfaceRow() {
  return (
    <Surface row>
      <Button title="Awesome" />
      <Button title="Blossom" />
    </Surface>
  )
}
