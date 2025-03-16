import {useMemo} from 'react'
import {useWindowDimensions} from 'react-native'

/**
 * Get the orientation and device size
 */
export const useDeviceInfo = () => {
  const {width, height} = useWindowDimensions()

  const isLandscape = useMemo(() => {
    return width > height
  }, [height, width])

  return {
    isPortrait: !isLandscape,
    isLandscape,
    width,
    height,
  }
}
