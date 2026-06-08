import React, {useEffect, useRef, useState} from 'react'
import {View as RNView, StyleSheet} from 'react-native'

import {
  View,
  useBlossomTheme,
  useMergedProps,
} from '@react-native-blossom-ui/components'

import {usePopover} from './usePopover'
import {PopoverProps} from './types'

function Popover(props: PopoverProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    visible,
    children,
    fitTargetWidth = false,
    targetContainerStyle,
    ...options
  } = useMergedProps('Popover', props, {
    colors,
    isDark,
  })

  const [targetWidth, setTargetWidth] = useState(0)

  const {open, update, close} = usePopover(targetWidth, fitTargetWidth)

  const ref = useRef<RNView>(null)
  const hasOpened = useRef(false)

  useEffect(() => {
    const nextOptions = {...options, content: children}

    if (visible) {
      if (hasOpened.current) {
        update(ref, nextOptions)
        return
      }

      open(ref, nextOptions)
      hasOpened.current = true
    } else {
      close()
      hasOpened.current = false
    }
  }, [children, close, open, options, update, visible])

  return (
    <View
      row
      ref={ref}
      style={[styles.wrapContent, targetContainerStyle]}
      onLayout={(e) => {
        setTargetWidth(e.nativeEvent.layout.width)
      }}>
      {options.Target}
    </View>
  )
}

export default Popover

const styles = StyleSheet.create({
  wrapContent: {
    alignSelf: 'baseline',
  },
})
