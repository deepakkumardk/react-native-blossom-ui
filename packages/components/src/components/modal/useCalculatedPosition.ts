import {RefObject, useLayoutEffect, useMemo, useState} from 'react'

import {LayoutRectangle, useWindowDimensions, View} from 'react-native'

const HEIGHT_OFFSET = 10

/**
 * It calculates the position of the popover based on the remaining space at the bottom or top
 * @param popoverHeight height of the popover content
 */
export const useCalculatedPosition = (
  popoverHeight: number,
  isVisible?: boolean,
  targetRef?: RefObject<View>,
) => {
  const {height: deviceHeight} = useWindowDimensions()

  const [pressableLayout, setPressableLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  useLayoutEffect(() => {
    targetRef?.current?.measureInWindow((x, y, width, height) => {
      setPressableLayout({
        x,
        y,
        width,
        height,
      })
    })
  }, [targetRef, isVisible])

  const pickerPosition = useMemo(() => {
    let autoPosition = 'bottom'

    const remainingSpace =
      deviceHeight - pressableLayout.y - pressableLayout.height

    if (remainingSpace < popoverHeight) {
      autoPosition = 'top'
    }

    return autoPosition
  }, [deviceHeight, popoverHeight, pressableLayout])

  return {
    pickerPosition,
    setPressableLayout,
    offset: pickerPosition === 'top' ? 0 : 0,
  }
}
