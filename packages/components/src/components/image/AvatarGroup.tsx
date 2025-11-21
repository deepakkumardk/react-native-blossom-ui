import React from 'react'

import {StyleSheet, TouchableOpacity} from 'react-native'
import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import {AvatarGroupItem, AvatarGroupProps} from '../types'
import {View} from '../view'
import Avatar from './Avatar'
import {OFFSET, SIZE_MAP, SPACING_MAP} from './sizesValues'

/**
 * Group of avatars with overlap and showing count for extra avatars
 */
function AvatarGroup(props: AvatarGroupProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    avatars = [],
    max = 3,
    spacing = -16,
    bringToFront,
    renderCount,
    onPress,
    ...rest
  } = useMergedProps('AvatarGroup', props, {colors, isDark})

  const displayAvatars = avatars.slice(0, max)
  const extraCount = avatars.length - max

  const sizeSpacing =
    spacing ||
    (typeof rest?.size === 'number'
      ? spacing
      : SPACING_MAP[rest?.size || 'medium'])

  const Container = onPress ? TouchableOpacity : View

  return (
    <Container style={styles.container} onPress={onPress} activeOpacity={0.6}>
      {avatars.slice(0, max).map((avatar: AvatarGroupItem, index: number) => {
        const marginLeft = index === 0 ? 0 : sizeSpacing

        return (
          <Avatar
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            {...avatar}
            {...rest}
            containerStyle={[
              {
                marginLeft,
                zIndex:
                  avatar.zIndex ||
                  displayAvatars.length + (bringToFront ? index : -index),
              },
              rest.containerStyle,
            ]}
            style={[
              {
                borderWidth: 2,
                borderColor: colors.text100,
              },
              rest.style,
            ]}
          />
        )
      })}

      {extraCount > 0 &&
        (renderCount?.(extraCount) || (
          <Avatar
            {...rest}
            size={
              (typeof rest?.size === 'number'
                ? Number(rest?.size)
                : SIZE_MAP[rest?.size || 'medium']) - OFFSET
            }
            containerStyle={{
              marginLeft: sizeSpacing,
              zIndex: bringToFront
                ? displayAvatars.length + 100
                : -displayAvatars.length - 100,
            }}
            initials={`+${extraCount}`}
            style={{
              borderWidth: 2,
              borderColor: colors.text100,
            }}
          />
        ))}
    </Container>
  )
}

export default AvatarGroup

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
