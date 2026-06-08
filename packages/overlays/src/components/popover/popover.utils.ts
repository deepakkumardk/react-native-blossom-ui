import {Dimensions, LayoutRectangle, Platform, StatusBar} from 'react-native'
import {PopoverArrowStyle, PopoverPosition, PopoverPositionStyle} from './types'

const SCREEN_PADDING = 16
const ARROW_SIZE = 8
const HALF_ARROW_SIZE = ARROW_SIZE / 2

const OFFSET_PADDING = 4

const ANDROID_STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0

export function calculatePopoverPosition({
  anchor,
  position = 'bottom',
  offsetX = 0,
  offsetY = 0,
  contentHeight,
  contentWidth = 200,
  targetWidth,
  fitTargetWidth,
  arrowOffset = 0,
  withArrow,
}: {
  anchor: LayoutRectangle
  position?: PopoverPosition
  offsetX?: number
  offsetY?: number
  contentHeight: number
  contentWidth?: number
  targetWidth: number
  fitTargetWidth?: boolean
  arrowOffset?: number
  withArrow?: boolean
}) {
  const {x: pageX, y: pageY, width, height} = anchor
  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height

  let centerX = pageX + width / 2 - contentWidth / 2
  let centerY = pageY + height / 2 - contentHeight / 2

  if (centerX < 0) {
    centerX = 8
  } else if (centerX + contentWidth > deviceWidth) {
    centerX = deviceWidth - contentWidth - 8
  }

  if (centerY < 0) {
    centerY = 8
  } else if (centerY + contentHeight > deviceHeight) {
    centerY = deviceHeight - contentHeight - 8
  }

  const ARROW_OFFSET = withArrow ? HALF_ARROW_SIZE : 0

  const positionStyleMap: Record<PopoverPosition, PopoverPositionStyle> = {
    left: {
      top: centerY + offsetY + ANDROID_STATUS_BAR_HEIGHT,
      right: deviceWidth - pageX + offsetX + OFFSET_PADDING + ARROW_OFFSET,
      maxWidth: pageX - offsetX - SCREEN_PADDING,
    },
    right: {
      top: centerY + offsetY + ANDROID_STATUS_BAR_HEIGHT,
      left: pageX + width + offsetX + OFFSET_PADDING + ARROW_OFFSET,
      maxWidth: deviceWidth - (pageX + width + offsetX) - SCREEN_PADDING,
    },
    top: {
      left: (fitTargetWidth ? pageX : centerX) + offsetX,
      bottom:
        deviceHeight -
        pageY +
        offsetY +
        OFFSET_PADDING -
        ANDROID_STATUS_BAR_HEIGHT +
        ARROW_OFFSET,
      maxWidth: deviceWidth - SCREEN_PADDING,
    },
    bottom: {
      left: (fitTargetWidth ? pageX : centerX) + offsetX,
      top:
        pageY +
        height +
        offsetY +
        OFFSET_PADDING +
        ANDROID_STATUS_BAR_HEIGHT +
        ARROW_OFFSET,
      maxWidth: deviceWidth - SCREEN_PADDING,
    },
  }

  return {
    contentPositionStyle: {
      ...positionStyleMap[position],
      ...(fitTargetWidth && {width: targetWidth}),
    },
    trianglePositionStyle: {
      ...getArrowPositionStyle({
        position,
        contentWidth,
        contentHeight,
        arrowOffset,
      }),
    },
  }
}

const getArrowPositionStyle = ({
  position = 'bottom',
  contentWidth,
  contentHeight,
  arrowOffset = 0,
}: {
  position?: PopoverPosition
  contentWidth: number
  contentHeight: number
  arrowOffset?: number
}): PopoverArrowStyle => {
  const arrowPositionStyleMap: Record<PopoverPosition, PopoverArrowStyle> = {
    left: {
      top: contentHeight / 2 - HALF_ARROW_SIZE + arrowOffset,
      right: -ARROW_SIZE,
      transform: [
        {
          rotate: '90deg',
        },
      ],
    },
    right: {
      top: contentHeight / 2 - HALF_ARROW_SIZE + arrowOffset,
      left: -ARROW_SIZE,
      transform: [
        {
          rotate: '270deg',
        },
      ],
    },
    top: {
      left: contentWidth / 2 - HALF_ARROW_SIZE + arrowOffset,
      bottom: -ARROW_SIZE,
      transform: [
        {
          rotate: '180deg',
        },
      ],
    },
    bottom: {
      left: contentWidth / 2 - HALF_ARROW_SIZE + arrowOffset,
      top: -ARROW_SIZE,
      transform: [
        {
          rotate: '0deg',
        },
      ],
    },
  }

  return arrowPositionStyleMap[position]
}
