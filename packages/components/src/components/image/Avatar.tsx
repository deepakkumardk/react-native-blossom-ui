import React, {forwardRef, useMemo} from 'react'
import {Image, ImageStyle, StyleSheet, TouchableOpacity} from 'react-native'

import {AvatarProps} from '../types'

import {getBorderColorName, getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {Text} from '../text'
import {useMergedProps, BlossomSize} from '../../common'
import {View} from '../view'
import {Icon} from '../icon'

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
    status = 'primary',
    size = 'medium',
    onPress,
    ...rest
  } = useMergedProps('Avatar', props, {colors, isDark})

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
      activeOpacity={0.75}
      {...rest}
      style={[imageStyle, styles.container, rest?.style]}
      onPress={onPress}>
      {rest?.source || url ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Image
          ref={ref}
          accessibilityIgnoresInvertColors
          source={{
            uri: url,
          }}
          {...rest}
          style={[imageStyle]}
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
