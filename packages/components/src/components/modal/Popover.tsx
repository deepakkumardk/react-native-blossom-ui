import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  UIManager,
  findNodeHandle,
  View as RNView,
  Platform,
} from 'react-native'
import {useBlossomTheme} from '../../context'
import {Surface, View} from '../view'
import {PopoverProps, PopoverRef} from '../types'
import {useMergedProps, useDeviceInfo} from '../../common'

// Platform-specific offsets to account for status bar and navigation differences
const TOP_DEFAULT_OFFSET = Platform.OS === 'android' ? 36 : 0
const BOTTOM_DEFAULT_OFFSET = Platform.OS === 'android' ? 0 : 0

/**
 * Show a UI relative to the target view
 */
const Popover = (props: PopoverProps, ref?: React.Ref<PopoverRef>) => {
  const {colors, isDark, options} = useBlossomTheme()

  const targetViewRef = useRef<RNView>(null)

  const {
    visible,
    position = 'bottom',
    wrapContent,
    offset = 6,
    Target,
    targetRef,
    fitTargetWidth,
    onBackdropPress,
    children,
    contentStyle,
  } = props
  // TODO: not working because of max. call stack
  // useMergedProps(
  //   'Popover',
  //   props,
  //   {colors, isDark},
  // )

  const {width: deviceWidth, isPortrait, isLandscape} = useDeviceInfo()

  const [showContent, setShowContent] = useState(visible)
  const [contentWidth, setContentWidth] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)

  const [positionStyle, setPositionStyle] = useState<{
    left?: number
    right?: number
    top?: number
    bottom?: number
    maxWidth?: number
    targetWidth?: number
    position?: 'absolute' | 'relative'
  }>({})

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setShowContent(true)
      },
      close: () => {
        setShowContent(false)
      },
    }),
    [],
  )

  const measureContent = useCallback(() => {
    const updatePositionStyle = ({
      width,
      height,
      pageX,
      pageY,
    }: {
      // Width and height of the target view
      width: number
      height: number
      // PageX and PageY are the coordinates of the target view relative to the screen
      pageX: number
      pageY: number
    }) => {
      const offsetWidthMap: Record<typeof position, number> = {
        top: deviceWidth - pageX,
        bottom: deviceWidth - pageX,
        left: pageX - offset,
        right: deviceWidth - (pageX + width + offset),
      }
      const positionStyleMap: Record<typeof position, typeof positionStyle> = {
        left: {
          right: deviceWidth - pageX + offset,
          top: pageY,
          // TODO: fix this for left position
          position: 'absolute',
        },
        right: {
          left: pageX + width + offset,
          top: pageY,
        },
        top: {
          left: pageX,
          bottom: -pageY + offset + TOP_DEFAULT_OFFSET + contentHeight,
        },
        bottom: {
          left: pageX,
          top: pageY + height + offset + BOTTOM_DEFAULT_OFFSET,
        },
      }

      setPositionStyle({
        ...positionStyleMap[position],
        ...(!fitTargetWidth &&
          !wrapContent &&
          (position === 'top' || position === 'bottom') &&
          {
            // left: OFFSET_PADDING,
            // right: OFFSET_PADDING,
          }),
        maxWidth: offsetWidthMap[position],
        targetWidth: width,
      })
    }

    if (Platform.OS === 'web') {
      // For web, use getBoundingClientRect on the ref element
      let targetElement: HTMLElement | null = null
      if (
        targetViewRef.current &&
        typeof (targetViewRef.current as unknown as HTMLElement)
          .getBoundingClientRect === 'function'
      ) {
        targetElement = targetViewRef.current as unknown as HTMLElement
      } else if (
        targetRef &&
        typeof targetRef === 'object' &&
        targetRef !== null &&
        'current' in targetRef &&
        targetRef.current &&
        typeof (targetRef.current as unknown as HTMLElement)
          .getBoundingClientRect === 'function'
      ) {
        targetElement = targetRef.current as unknown as HTMLElement
      }

      if (!targetElement) {
        console.warn('Popover: Unable to find target element for measurement')
        return
      }

      const {
        width,
        height,
        left: pageX,
        top: pageY,
      } = targetElement.getBoundingClientRect()

      updatePositionStyle({width, height, pageX, pageY})
    } else {
      // Native platforms
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const nativeRef: React.Component | null =
        // Find the first children inside the target ref
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
        targetViewRef?.current?._children?.[0] ||
        targetViewRef?.current ||
        // eslint-disable-next-line
        // @ts-ignore
        targetRef?.current
      const node = nativeRef ? findNodeHandle(nativeRef) : null

      if (!node) {
        console.warn('Popover: Unable to find native node for measurement')
        return
      }

      // TODO: update measurement logic with ref
      UIManager.measure(
        node,
        (
          x: number,
          y: number,
          // Width and height of the target view
          width: number,
          height: number,
          // PageX and PageY are the coordinates of the target view relative to the screen
          pageX: number,
          pageY: number,
        ) => {
          if (width > 0 && height > 0) {
            updatePositionStyle({width, height, pageX, pageY})
          }
        },
      )
    }
  }, [
    contentHeight,
    deviceWidth,
    fitTargetWidth,
    offset,
    position,
    targetRef,
    wrapContent,
  ])

  useEffect(() => {
    setShowContent(visible)
  }, [visible])

  useEffect(() => {
    if (!showContent) return

    measureContent()
  }, [measureContent, showContent, isPortrait, isLandscape])

  return (
    <View>
      <View ref={targetViewRef}>{Target}</View>

      <RNModal
        transparent
        visible={showContent}
        onRequestClose={onBackdropPress}
        supportedOrientations={['portrait', 'landscape']}
        accessibilityViewIsModal
        statusBarTranslucent>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close popover"
          style={styles.backdrop}
          onPress={(e) => {
            e.stopPropagation()
            onBackdropPress?.()
          }}
        />
        {/* NOTE: This is wrapped to skip the touch event inside the content view */}
        <View>
          <Surface
            style={[
              styles.content,
              styles.shadow,
              positionStyle,
              {
                borderColor: colors.background300,
                shadowColor: colors.background200,
              },
              fitTargetWidth && {width: positionStyle.targetWidth},
              contentStyle,
            ]}
            onLayout={(e) => {
              setContentWidth(e.nativeEvent.layout.width)
              setContentHeight(e.nativeEvent.layout.height)
            }}>
            {/* Render children only once the content has been measured to fix flicker issue */}
            {positionStyle.maxWidth || positionStyle.targetWidth
              ? children
              : null}
          </Surface>
        </View>
      </RNModal>
    </View>
  )
}

export default forwardRef(Popover)

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    margin: 0,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '100%',
    // To wrap content width
    alignSelf: 'flex-start',
  },
  shadow: {
    // android
    elevation: 5,
    // ios
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 8,
      height: 8,
    },
  },
})
