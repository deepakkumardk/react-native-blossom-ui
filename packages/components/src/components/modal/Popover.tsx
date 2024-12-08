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
} from 'react-native'
import {useBlossomTheme} from '../../context'
import View from '../view'
import {PopoverProps, PopoverRef} from '../types'
import {useMergedProps} from '../../common'

/**
 * Show a UI relative to the target view
 */
const Popover = (props: PopoverProps, ref?: React.Ref<PopoverRef>) => {
  const {colors, isDark, options} = useBlossomTheme()

  const targetViewRef = useRef<RNView>(null)

  const {
    visible,
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

  const [showContent, setShowContent] = useState(visible)

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const node = findNodeHandle(targetViewRef?.current || targetRef?.current)
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
        setPosition({
          left: pageX,
          top: pageY + height,
          width,
        })
      },
    )
  }, [targetRef, targetViewRef])

  useEffect(() => {
    setShowContent(visible)
  }, [visible])

  useEffect(() => {
    if (!showContent) return

    measureContent()
  }, [measureContent, showContent])

  return (
    <View>
      <View ref={targetViewRef}>{Target}</View>
      <Modal transparent visible={showContent} onRequestClose={onBackdropPress}>
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
                {
                  top: position.top,
                  left: position.left,
                  borderColor: colors.background300,
                  shadowColor: colors.background200,
                  maxWidth: position.width,
                },
                fitTargetWidth && {width: position.width},
                contentStyle,
              ]}>
              {children}
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
    borderWidth: 0.4,
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
