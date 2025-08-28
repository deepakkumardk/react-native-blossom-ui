import React, {forwardRef, useMemo, useState} from 'react'
import {Image, ImageStyle, StyleSheet, TouchableOpacity} from 'react-native'

import {AvatarProps} from '../types'

import {BlossomSize, useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import {Icon} from '../icon'
import {Text} from '../text'
import {getBorderColorName, getStatusColorName} from '../utils'
import {View} from '../view'

/**
 * Avatar component to show profile images, icon & initials
 */
const Avatar = (props: AvatarProps, ref: React.Ref<Image>) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    mode = 'circle',
    icon,
    url,
    initials,
    initialStyle,
    fallbackSource,
    fallbackIcon,
    status = 'primary',
    size = 'medium',
    onPress,
    ...rest
  } = useMergedProps('Avatar', props, {colors, isDark})

  const [hasLoadingFailed, setHasLoadingFailed] = useState(false)

  const borderRadiusMap = useMemo(
    (): Record<typeof mode, number> => ({
      circle: typeof size === 'number' ? size : sizeMap[size] / 2,
      round: options?.borderRadius || 0,
      square: 0,
    }),
    [options?.borderRadius, size],
  )

  const imageStyle = useMemo(
    (): ImageStyle => ({
      width: typeof size === 'number' ? size : sizeMap[size],
      height: typeof size === 'number' ? size : sizeMap[size],
      borderColor: colors[getBorderColorName(status, isDark)],
      backgroundColor: colors[getStatusColorName(status, isDark, '200')],
      borderRadius: borderRadiusMap[mode],
    }),
    [borderRadiusMap, colors, isDark, mode, size, status],
  )

  const Container = onPress ? TouchableOpacity : View

  return (
    <Container
      activeOpacity={0.6}
      {...rest}
      style={[imageStyle, styles.container, rest?.style]}
      onPress={onPress}>
      {fallbackIcon && hasLoadingFailed ? (
        fallbackIcon((imageStyle.width as number) - OFFSET)
      ) : rest?.source || url ? (
        <Image
          ref={ref}
          accessibilityIgnoresInvertColors
          source={
            hasLoadingFailed && fallbackSource ? fallbackSource : {uri: url}
          }
          {...rest}
          onError={(error) => {
            setHasLoadingFailed(true)
            rest?.onError?.(error)
          }}
          style={[imageStyle, rest?.style]}
        />
      ) : icon ? (
        icon((imageStyle.width as number) - OFFSET)
      ) : initials ? (
        <Text
          style={[
            {
              color: colors.bgLight100,
              fontSize: (imageStyle.width as number) / 2,
            },
            initialStyle,
          ]}>
          {initials}
        </Text>
      ) : (
        <Icon
          family="MaterialCommunityIcons"
          name="account"
          size={(imageStyle.width as number) - OFFSET}
          color="white"
        />
      )}
    </Container>
  )
}

export default forwardRef(Avatar)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const sizeMap: Record<BlossomSize, number> = {
  small: 40,
  medium: 64,
  large: 96,
}

const OFFSET = 8
