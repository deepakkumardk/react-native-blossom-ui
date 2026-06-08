import React, {RefObject, useCallback, useRef, useState} from 'react'
import {
  LayoutRectangle,
  StyleSheet,
  View as RNView,
  LayoutChangeEvent,
} from 'react-native'

import {useBlossomTheme, View} from '@react-native-blossom-ui/components'

import {useOverlay} from '../overlay'
import {PopoverWithContentOptions} from './types'
import {calculatePopoverPosition} from './popover.utils'
import Triangle from './Triangle'

export function usePopover(targetWidth: number, fitTargetWidth: boolean) {
  const {colors} = useBlossomTheme()
  const {show, dismiss, update} = useOverlay()
  const overlayId = useRef<string | null>(null)

  const anchorPositionRef = useRef<LayoutRectangle | null>(null)
  const optionsRef = useRef<PopoverWithContentOptions | null>(null)

  const [contentHeight, setContentHeight] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)

  const updatePosition = useCallback(
    (newWidth: number, newHeight: number) => {
      if (
        !overlayId.current ||
        !anchorPositionRef.current ||
        !optionsRef.current
      ) {
        return
      }

      const {contentPositionStyle} = calculatePopoverPosition({
        anchor: anchorPositionRef.current,
        position: optionsRef.current.position,
        offsetX: optionsRef.current.offsetX,
        offsetY: optionsRef.current.offsetY,
        contentWidth: newWidth,
        contentHeight: newHeight,
        targetWidth,
        fitTargetWidth,
        arrowOffset: optionsRef.current.arrowOffset,
        withArrow: optionsRef.current.withArrow,
      })

      update(overlayId.current, {
        top: contentPositionStyle.top,
        left: contentPositionStyle.left,
        contentStyle: [
          styles.overlayContent,
          styles.border,
          contentPositionStyle,
          {
            backgroundColor: colors.background100,
            borderColor: colors.background500,
            opacity: 1,
          },
          styles.shadow,
          optionsRef.current.contentStyle,
        ],
      })
    },
    [
      targetWidth,
      fitTargetWidth,
      update,
      colors.background100,
      colors.background500,
    ],
  )

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const {width, height} = e.nativeEvent.layout
      setContentWidth(width)
      setContentHeight(height)
      updatePosition(width, height)
    },
    [updatePosition],
  )

  const updatePopover = useCallback(
    (
      anchorRef: RefObject<RNView | null>,
      options: PopoverWithContentOptions,
    ) => {
      if (
        !overlayId.current ||
        !anchorRef?.current ||
        !anchorPositionRef.current ||
        !optionsRef.current
      ) {
        return
      }

      anchorRef.current.measureInWindow((x, y, width, height) => {
        const anchor = {x, y, width, height}

        anchorPositionRef.current = anchor
        optionsRef.current = options

        const {contentPositionStyle, trianglePositionStyle} =
          calculatePopoverPosition({
            anchor,
            position: options.position,
            offsetX: options.offsetX,
            offsetY: options.offsetY,
            contentWidth,
            contentHeight,
            targetWidth,
            fitTargetWidth,
            arrowOffset: options.arrowOffset,
            withArrow: options.withArrow,
          })

        if (!overlayId.current) return

        update(overlayId.current, {
          top: contentPositionStyle.top,
          left: contentPositionStyle.left,
          content: (
            <View style={styles.innerContent} onLayout={onLayout}>
              {options.content}
              {options.withArrow && (
                <Triangle style={[trianglePositionStyle, styles.triangle]} />
              )}
            </View>
          ),
          backdropBehavior: options.backdropBehavior ?? 'dismiss',
          backdropStyle: [options.backdropStyle],
          contentStyle: [
            styles.overlayContent,
            styles.border,
            contentPositionStyle,
            {
              backgroundColor: colors.background100,
              borderColor: colors.background500,
              opacity: 1,
            },
            styles.shadow,
            options.contentStyle,
          ],
        })
      })
    },
    [
      contentWidth,
      contentHeight,
      targetWidth,
      fitTargetWidth,
      update,
      onLayout,
      colors.background100,
      colors.background500,
    ],
  )

  const open = (
    anchorRef: RefObject<RNView | null>,
    options: PopoverWithContentOptions,
  ) => {
    if (!anchorRef?.current) return

    requestAnimationFrame(() => {
      anchorRef?.current?.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          const anchor: LayoutRectangle = {x, y, width, height}

          anchorPositionRef.current = anchor
          optionsRef.current = options

          const {contentPositionStyle, trianglePositionStyle} =
            calculatePopoverPosition({
              anchor,
              position: options.position,
              offsetX: options.offsetX,
              offsetY: options.offsetY,
              contentWidth,
              contentHeight,
              targetWidth,
              fitTargetWidth,
              arrowOffset: options.arrowOffset,
              withArrow: options.withArrow,
            })

          overlayId.current = show({
            type: 'popover',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            top: contentPositionStyle.top,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            left: contentPositionStyle.left,
            withBackdrop: true,
            backdropBehavior: options.backdropBehavior ?? 'dismiss',
            content: (
              <View style={styles.innerContent} onLayout={onLayout}>
                {options.content}
                {options.withArrow && (
                  <Triangle style={[trianglePositionStyle, styles.triangle]} />
                )}
              </View>
            ),
            // animationConfig: options.animationConfig,
            onDismiss: () => {
              options.onDismiss?.()
              if (overlayId.current) {
                dismiss(overlayId.current)
                overlayId.current = null
              }
            },
            backdropStyle: [options.backdropStyle],
            contentStyle: [
              styles.overlayContent,
              styles.border,
              contentPositionStyle,
              {
                backgroundColor: colors.background100,
                borderColor: colors.background500,
                opacity: 0,
              },
              styles.shadow,
              options.contentStyle,
            ],
          })
        },
      )
    })
  }

  const close = () => {
    if (overlayId.current) {
      dismiss(overlayId.current)
      overlayId.current = null
    }
  }

  return {
    open,
    close,
    update: updatePopover,
  }
}

const styles = StyleSheet.create({
  overlayContent: {
    borderRadius: 12,
    // NOTE: to make the arrow visible outside of the content container
    overflow: 'visible',
    borderWidth: 1,
  },
  border: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  innerContent: {
    padding: 8,
  },
  triangle: {
    position: 'absolute',
  },
})
