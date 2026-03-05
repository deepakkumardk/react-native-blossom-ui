import {ReactNode} from 'react'
import {
  EasingFunction,
  PressableProps,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native'

/**
 * Overlay Provider Props
 */

export type Listener = () => void

export type OverlayUpdate = Partial<Omit<OverlayNode, 'id'>>

export interface OverlayManagerProps extends OverlayActions {
  subscribe(listener: Listener): () => void
  getState(): OverlayNode[]
  has(id: string): boolean
}

export type OverlayContextValue = OverlayManagerProps

export type OverlayActions = {
  show: (node: Omit<OverlayNode, 'id'>) => string
  update: (id: string, updatedNode: Partial<Omit<OverlayNode, 'id'>>) => void
  dismiss: (id: string) => void
  dismissLast: () => void
  dismissAll: () => void
}

export type OverlayBackdropProps = PressableProps &
  ViewProps &
  Pick<OverlayNode, 'backdropBehavior'>

/**
 * Components types
 */

export type OverlayType =
  | 'dialog'
  | 'menu'
  | 'modal'
  | 'popover'
  | 'sheet'
  | 'snackbar'
  | 'spotlight'
  | 'toast'
  | 'tooltip'

export type OverlayBackdropBehavior = 'interactive' | 'block' | 'dismiss'

export interface OverlayNode {
  id: string
  type: OverlayType

  content: ReactNode

  top: number
  left: number

  backdropStyle?: StyleProp<ViewStyle>

  withBackdrop?: boolean
  /**
   * Control the behavior of the backdrop when the overlay is open
   * - interactive: allows interaction with the backdrop
   * - block: won't allow any interaction with the backdrop and won't trigger onDismiss when the backdrop is pressed
   * - dismiss: will trigger onDismiss when the backdrop is pressed but won't allow any interaction with the backdrop
   *
   * @default interactive
   */
  backdropBehavior?: OverlayBackdropBehavior
  /**
   * Control whether the overlay should be dismissed when the back button is pressed on Android
   * @platform android
   */
  dismissOnBackPress?: boolean

  // stackMode?: 'stack' | 'replace'

  duration?: number

  onDismiss?: () => void

  animationConfig?: AnimationConfig
}

export type AnimationPhase =
  | 'idle'
  | 'entering'
  | 'entered'
  | 'exiting'
  | 'exited'

export interface AnimationConfig {
  /**
   * @default 200
   */
  duration?: number
  delay?: number
  /**
   * @default timing
   */
  type?: 'timing' | 'spring' | 'decay'
  /**
   * @default ease-out
   */
  easing?: EasingFunction

  /**
   * @default true
   */
  useNativeDriver?: boolean

  onAnimationStart?: () => void
  onAnimationEnd?: (finished: boolean) => void
}
