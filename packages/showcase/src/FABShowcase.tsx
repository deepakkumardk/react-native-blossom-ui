import React from 'react'

import {Icon, FAB} from '@react-native-blossom-ui/components'

export function FABUsage() {
  return <FAB title="FAB" icon={<Icon name="add" size={24} color="white" />} />
}

export function FABOffset() {
  return (
    <FAB
      size="large"
      icon={<Icon name="add" size={32} color="white" />}
      offsetX={48}
      offsetY={120}
    />
  )
}
