import {ReactNode} from 'react'
import {
  Animated,
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

export interface OverlayControllerProps extends OverlayActions {
  subscribe(listener: Listener): () => void
  getState(): OverlayNode[]
  has(id: string): boolean
}

export type OverlayContextValue = OverlayControllerProps

export type OverlayActions = {
  show: (node: Omit<OverlayNode, 'id'>) => string
  update: (id: string, updatedNode: Partial<Omit<OverlayNode, 'id'>>) => void
  dismiss: (id: string) => void
  dismissLast: (type?: OverlayNode['type']) => void
  dismissScope: (scope: string) => void
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

export interface BaseOverlayNode {
  /**
   * Unique identifier for the overlay node.
   * This is used internally to manage the overlay stack and should not be provided by the user.
   * The `show` method will return the generated id when an overlay is shown.
   */
  id: string
  /**
   * Type of the overlay, this can be used to categorize the overlays
   * no default styles or behavior are attached to the type, it's just for categorization and easier management of the overlays
   * except for dismissLast method which can dismiss the last overlay of a specific type
   */
  type: OverlayType
  /**
   * The content of the overlay
   */
  content?: ReactNode

  top: number
  left: number

  backdropStyle?: StyleProp<ViewStyle>

  /**
   * Whether to show a backdrop behind the overlay.
   * If true, the backdrop will be rendered and its behavior will be determined by the `backdropBehavior` property.
   */
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

  /**
   * Optional scope for grouping overlays.
   * This can be used to dismiss all overlays within the same scope using the `dismissScope` method.
   */
  scope?: string
  /**
   * Duration in milliseconds after which the overlay will be automatically dismissed.
   */
  duration?: number

  /**
   * Callback function that is called when the overlay is dismissed.
   */
  onDismiss?: () => void

  /**
   * Custom animation configuration for the overlay.
   * This allows you to define custom enter and exit animations for the overlay.
   */
  animationConfig?: OverlayAnimationConfig

  /**
   * Custom animation driver for the overlay. This is a function that takes an Animated.Value and returns an Animated.CompositeAnimation.
   * If `renderAnimated` is provided, this driver will be used to control the animation of the overlay.
   * If not provided, the default fade in/out animation will be used.
   */
  animationDriver?: OverlayAnimationDriver
  /**
   * Custom render function for the overlay content with animation support. This allows you to have full control over the rendering and animation of the overlay.
   * If this is provided, the `animationDriver` will be used to control the animation of the overlay, and the `content` property will be ignored.
   * The render function receives an object with the following properties:
   * @param ctx
   * - progress: An Animated.Value that represents the progress of the animation (0 to 1).
   * - phase: A string that indicates the current phase of the animation ('entering', 'entered', 'exiting', 'exited').
   * - requestDismiss: A function that can be called to request the dismissal of the overlay.
   * @returns A ReactNode that represents the content of the overlay. This content will be rendered with the provided animation.
   */
  renderAnimated?: (ctx: OverlayAnimationProps) => React.ReactNode

  /**
   * Custom styles for the overlay container.
   */
  containerStyle?: StyleProp<ViewStyle>
}

export type OverlayNodeContent = BaseOverlayNode & {
  content: ReactNode
}
export type OverlayNodeAnimatedContent = BaseOverlayNode & {
  renderAnimated: (ctx: OverlayAnimationProps) => React.ReactNode
}

export type OverlayNode = OverlayNodeContent | OverlayNodeAnimatedContent

export type OverlayAnimationProps = {
  progress: Animated.Value
  phase: 'entering' | 'entered' | 'exiting' | 'exited'
  requestDismiss: () => void
}

export type AnimationPhase = 'entering' | 'entered' | 'exiting' | 'exited'

export type OverlayAnimationDriver = (
  value: Animated.Value,
) => Animated.CompositeAnimation

export type OverlayAnimationConfig = {
  /**
   * Custom animation for when the overlay enters. This is a function that takes an Animated.Value and returns an Animated.CompositeAnimation.
   * If not provided, the default fade in animation will be used.
   */
  enter?: OverlayAnimationDriver
  /**
   * Custom animation for when the overlay exits. This is a function that takes an Animated.Value and returns an Animated.CompositeAnimation.
   * If not provided, the default fade out animation will be used.
   */
  exit?: OverlayAnimationDriver
}
