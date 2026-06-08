import {ReactNode} from 'react'

import {StyleProp, ViewStyle} from 'react-native'
import {OverlayNode} from '../overlay'

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right'

export type BasePopoverOptions = Pick<
  OverlayNode,
  | 'animationConfig'
  | 'animationDriver'
  | 'backdropBehavior'
  | 'backdropStyle'
  | 'contentStyle'
  | 'onDismiss'
  | 'dismissOnBackPress'
  | 'scope'
  | 'visible'
  | 'withBackdrop'
>

export type PopoverOptions = BasePopoverOptions & {
  /**
   * The target element that the popover will be anchored to.
   * The popover will be positioned relative to this target element based on the `position` prop.
   */
  Target: ReactNode
  /**
   * The position of the popover relative to the target element.
   * Can be one of "top", "bottom", "left", or "right". The default value is "bottom".
   * @default bottom
   */
  position?: PopoverPosition
  /**
   * The horizontal offset distance between the popover and the target element.
   * Positive values will move the popover to the right, while negative values will move it to the left.
   * @default 0
   */
  offsetX?: number
  /**
   * The vertical offset distance between the popover and the target element.
   * Positive values will move the popover downwards, while negative values will move it upwards.
   * @default 0
   */
  offsetY?: number
  /**
   * Whether to show an arrow pointing from the popover to the target element.
   * @default false
   */
  withArrow?: boolean
  /**
   * The offset of the arrow from the center of the popover.
   * Positive values will move the arrow to the right, while negative values will move it to the left.
   */
  arrowOffset?: number
}

export type PopoverWithContentOptions = PopoverOptions & {
  content: ReactNode
}

export type PopoverProps = PopoverOptions & {
  /**
   * Whether the popover is visible or not.
   */
  visible: boolean
  /**
   * The content of the popover.
   */
  children: ReactNode
  /**
   * Whether the popover should fit the width of the target element.
   */
  fitTargetWidth?: boolean
  /**
   * Style for the container of the target element.
   * This prop exposed to add custom styles to the container of the target element.
   */
  targetContainerStyle?: StyleProp<ViewStyle>
}

/**
 * The style for positioning the popover content.
 */
export type PopoverPositionStyle = {
  left?: number
  right?: number
  top?: number
  bottom?: number

  width?: number
  maxWidth?: number
}

/**
 * The style for positioning the arrow indicator.
 */
export type PopoverArrowStyle = {
  left?: number
  right?: number
  top?: number
  bottom?: number

  transform?: {rotate: string}[]
}
