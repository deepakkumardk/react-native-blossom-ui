import React, {memo} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {SizedText} from '../text'
import Icon from '../icon'
import {SelectItemProps} from '../types'
import {useBlossomTheme} from '../../context'

/**
 * Row item for select
 */
const SelectItem = <T,>(props: SelectItemProps<T>) => {
  const {colors} = useBlossomTheme()

  const {
    item,
    onPress,
    withTickIcon = true,
    index,
    selectedIndex,
    style,
    size,
  } = props

  return (
    <Pressable
      accessibilityRole="button"
      style={[
        styles.item,
        index === selectedIndex && {
          backgroundColor: colors.primaryTransparent100,
        },
        style,
      ]}
      onPress={item.disabled ? undefined : onPress}>
      {withTickIcon && index === selectedIndex && (
        <Icon
          family="MaterialCommunityIcons"
          name="check"
          size={20}
          style={styles.icon}
        />
      )}
      <SizedText
        mode="body"
        size={size}
        style={[
          item.disabled && {
            color: colors.text500,
          },
        ]}>
        {item.label}
      </SizedText>
    </Pressable>
  )
}

export default memo(SelectItem)

const styles = StyleSheet.create({
  item: {
    padding: 8,
    marginHorizontal: 4,
    flexDirection: 'row',
  },
  label: {
    paddingStart: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    marginEnd: 6,
  },
})
