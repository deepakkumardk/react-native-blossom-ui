import {ReactNode} from 'react'
import {
  Animated,
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
  /**
   * Subscribe to overlay state changes. The provided listener function will be called whenever there is a change in the overlay state, such as when an overlay is shown, updated, or dismissed. The function returns an unsubscribe function that can be called to stop listening for changes.
   *
   * @returns A function that can be called to unsubscribe the listener.
   * @example
   * const unsubscribe = overlayController.subscribe(() => {
   *   console.log('Overlay state changed!')
   * })
   *
   * // To unsubscribe later
   * unsubscribe()
   * @param listener custom listener function
   */
  subscribe(listener: Listener): () => void
  /**
   * Get the current state of all overlays. This method returns an array of overlay nodes, each representing an active overlay in the system.
   *
   * @returns An array of `OverlayNode` objects representing the current active overlays.
   *
   * @example
   * const currentOverlays = overlayController.getState()
   * console.log(currentOverlays)
   */
  getState(): OverlayNode[]
  /**
   * Check if an overlay with the specified ID exists.
   * @returns `true` if an overlay with the given ID exists, otherwise `false`.
   * @param id overlay node id to find
   */
  has(id: string): boolean
}

export type OverlayContextValue = OverlayControllerProps

export type OverlayActions = {
  /**
   * Show a new overlay with the specified properties. This method adds a new overlay to the stack and returns its unique identifier.
   */
  show: (node: Omit<OverlayNode, 'id'>) => string
  /**
   * This method allows you to modify the properties of an active overlay, such as its content, position, or visibility.
   *
   * @param id The unique identifier of the overlay to update.
   * @param updatedNode An object containing the properties to update for the specified overlay. This can include any of the properties defined in `OverlayNode`, except for `id`.
   */
  update: (id: string, updatedNode: Partial<Omit<OverlayNode, 'id'>>) => void
  /**
   * Dismiss an active overlay by its unique identifier. This will trigger the exit animation and eventually remove the overlay from the stack.
   * @param id The unique identifier of the overlay to dismiss.
   */
  dismiss: (id: string) => void
  /**
   * Remove an active overlay by its unique identifier. This will immediately remove the overlay from the stack without triggering the exit animation.
   * @param id The unique identifier of the overlay to remove.
   */
  remove: (id: string) => void
  /**
   * Dismiss the most recently shown overlay, optionally filtering by type.
   * @param type Optional type of the overlay to dismiss. If not provided, it will dismiss the most recent overlay of any type.
   */
  dismissLast: (type?: OverlayNode['type']) => void
  /**
   * Dismiss all overlays within the specified scope.
   * @param scope The scope of the overlays to dismiss. This will dismiss all overlays that belong to the specified scope. If no scope is provided, it will not dismiss any overlays.
   */
  dismissScope: (scope: string) => void
  /**
   * Dismiss all active overlays, regardless of their type or scope. This will trigger the exit animation for all overlays and eventually remove them from the stack.
   * Use this method with caution, as it will close all overlays that are currently open.
   */
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
   * Whether the overlay is currently visible or not. This property is used internally to manage the visibility of the overlay and trigger the appropriate animations when showing or dismissing the overlay. It should not be provided by the user when showing an overlay, as it will be automatically managed by the system.
   */
  visible?: boolean
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

  /**
   * Custom styles for the overlay content
   */
  contentStyle?: StyleProp<ViewStyle>

  /**
   * The absolute position from the top of the screen where the overlay should appear.
   */
  top: number
  /**
   * The absolute position from the left of the screen where the overlay should appear.
   */
  left: number

  /**
   * Custom styles for the backdrop of the overlay. This will only be applied if `withBackdrop` is true.
   */
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
}

export type OverlayNodeContent = BaseOverlayNode & {
  /**
   * The content of the overlay. This can be any ReactNode and will be rendered as the content of the overlay. If `renderAnimated` is provided, this property will be ignored in favor of the custom render function.
   */
  content: ReactNode
}
export type OverlayNodeAnimatedContent = BaseOverlayNode & {
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
  renderAnimated: (ctx: OverlayAnimationProps) => React.ReactNode
}

export type OverlayNode = OverlayNodeContent | OverlayNodeAnimatedContent

export interface OverlayContainerProps {
  /**
   * Node properties used to render the overlay content and control its behavior.
   */
  node: OverlayNode
  /**
   * The index of the overlay in the stack, used to calculate zIndex
   */
  stackIndex: number
}

export type OverlayAnimationProps = {
  /**
   * An Animated.Value that represents the progress of the animation, typically ranging from 0 to 1. This value can be used to drive custom animations for the overlay content.
   */
  progress: Animated.Value
  /**
   * A string that indicates the current phase of the animation. It can be one of the following values:
   * - 'entering': The overlay is in the process of entering (becoming visible).
   * - 'entered': The overlay has fully entered and is now visible.
   * - 'exiting': The overlay is in the process of exiting (becoming hidden).
   * - 'exited': The overlay has fully exited and is now hidden.
   */
  phase: 'entering' | 'entered' | 'exiting' | 'exited'
  /**
   * A function that can be called to request the dismissal of the overlay.
   */
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
