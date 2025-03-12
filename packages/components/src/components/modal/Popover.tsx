import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  UIManager,
  findNodeHandle,
  View as RNView,
  useWindowDimensions,
} from 'react-native'
import {useBlossomTheme} from '../../context'
import {View} from '../view'
import {PopoverProps, PopoverRef} from '../types'
import {useMergedProps} from '../../common'

const OFFSET_PADDING = 16

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

  const {width: deviceWidth} = useWindowDimensions()

  const [showContent, setShowContent] = useState(visible)

  const [positionStyle, setPositionStyle] = useState<{
    left?: number
    right?: number
    top?: number
    bottom?: number
    maxWidth?: number
    targetWidth?: number
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
    const node = findNodeHandle(
      // Find the first children inside the target ref
      // eslint-disable-next-line
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, no-underscore-dangle
      targetViewRef?.current?._children?.[0] ||
        targetViewRef?.current ||
        // eslint-disable-next-line
        // @ts-ignore
        targetRef?.current,
    )
    if (!node) return

    UIManager.measure(
      node,
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        const offsetWidthMap: Record<typeof position, number> = {
          top: deviceWidth,
          bottom: deviceWidth,
          left: pageX - offset,
          right: deviceWidth - (pageX + width + offset),
        }
        const positionStyleMap: Record<typeof position, typeof positionStyle> =
          {
            left: {
              right: deviceWidth - pageX + offset,
              top: pageY,
            },
            right: {
              left: pageX + width + offset,
              top: pageY,
            },
            top: {
              left: pageX,
              bottom: -pageY + offset,
            },
            bottom: {
              left: pageX,
              top: pageY + height + offset,
            },
          }

        setPositionStyle({
          ...positionStyleMap[position],
          ...(!fitTargetWidth &&
            !wrapContent &&
            (position === 'top' || position === 'bottom') && {
              left: OFFSET_PADDING,
              right: OFFSET_PADDING,
            }),
          maxWidth: offsetWidthMap[position],
          targetWidth: width,
        })
      },
    )
  }, [deviceWidth, fitTargetWidth, offset, position, targetRef, wrapContent])

  useEffect(() => {
    setShowContent(visible)
  }, [visible])

  useEffect(() => {
    if (!showContent) return

    measureContent()
  }, [measureContent, showContent])

  // if (showContent) {
  //   measureContent()
  // }

  return (
    <View>
      <View ref={targetViewRef}>{Target}</View>

      <Modal
        transparent
        visible={showContent}
        onRequestClose={onBackdropPress}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}>
        <Pressable
          accessibilityRole="alert"
          style={[styles.backdrop]}
          onPress={onBackdropPress}>
          {/* NOTE: This is wrapped to skip the touch event inside the content view */}
          <Pressable accessibilityRole="alert">
            <View
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
              ]}>
              {/* Render children only once the content has been measured to fix flicker issue */}
              {positionStyle.maxWidth || positionStyle.targetWidth
                ? children
                : null}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

export default forwardRef(Popover)

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '100%',
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
