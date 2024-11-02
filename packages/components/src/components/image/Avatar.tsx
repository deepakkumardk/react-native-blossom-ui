import React, {forwardRef} from 'react'
import {Image, ImageStyle, StyleSheet} from 'react-native'

import {AvatarProps, BlossomSize} from '../types'

import {getBorderColorName, getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import View from '../view'
import {Text} from '../text'

/**
 * Avatar component to show profile images, icon & initials
 */
const Avatar = (props: AvatarProps, ref: React.Ref<Image>) => {
  const {
    mode = 'circle',
    icon,
    initials,
    initialStyle,
    status = 'primary',
    size = 'medium',
    ...rest
  } = props

  const {colors, isDark, options} = useBlossomTheme()

  const borderRadiusMap: Record<typeof mode, number> = {
    circle: typeof size === 'number' ? size : sizeMap[size] / 2,
    round: options?.borderRadius || 0,
    square: 0,
  }

  const imageStyle: ImageStyle = {
    width: typeof size === 'number' ? size : sizeMap[size],
    height: typeof size === 'number' ? size : sizeMap[size],
    borderColor: colors[getBorderColorName(status, isDark)],
    backgroundColor: colors[getStatusColorName(status, isDark, '200')],
    borderRadius: borderRadiusMap[mode],
  }

  return (
    <View {...rest} style={[imageStyle, styles.container, rest?.style]}>
      {rest?.source ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Image
          ref={ref}
          accessibilityIgnoresInvertColors
          defaultSource={undefined}
          {...rest}
          style={[imageStyle]}
        />
      ) : icon ? (
        icon((imageStyle.width as number) - OFFSET)
      ) : (
        <Text
          typography="h6"
          style={[
            {
              color: colors.bgLight100,
              fontSize: (imageStyle.width as number) / 2,
            },
            styles.text,
            initialStyle,
          ]}>
          {initials}
        </Text>
      )}
    </View>
  )
}

export default forwardRef(Avatar)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 32,
  medium: 64,
  large: 96,
}

const OFFSET = 8
