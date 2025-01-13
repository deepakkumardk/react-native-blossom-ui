import React, {useEffect, useMemo, useState} from 'react'
import {StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {ChipProps} from '../types'
import {useMergedProps} from '../../common'
import Icon from '../icon'
import BaseButton from './BaseButton'
import {View} from '../view'
import {getTextColorName} from '../utils'

/**
 * Chip component with view and editable mode with status prop
 */
const Chip = (props: ChipProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    isSelected,
    clearable,
    viewOnly,
    onClearPress,
    mode = 'filled',
    size = 'medium',
    ...rest
  } = useMergedProps('Chip', props, {
    colors,
    isDark,
  })

  const [isChipSelected, setIsChipSelected] = useState(isSelected)
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    setIsChipSelected(isSelected)
  }, [isSelected])

  const iconColor = useMemo(() => {
    return mode === 'tinted'
      ? colors.text100
      : colors[getTextColorName(backgroundColor, isDark, rest.disabled, mode)]
  }, [backgroundColor, colors, isDark, mode, rest.disabled])

  return (
    <View>
      <BaseButton
        {...rest}
        mode={mode}
        style={[sizeStyle[size], styles.baseContainer, rest.style]}
        titleStyle={[sizeMap[size], rest?.titleStyle]}
        left={
          <View row style={styles.row}>
            {isChipSelected && (
              <Icon
                name="checkmark-sharp"
                color={iconColor}
                size={checkIconSize[size]}
              />
            )}
            {rest?.left}
          </View>
        }
        right={
          <View row style={styles.row}>
            {clearable && (
              <Icon
                name="close"
                size={checkIconSize[size]}
                style={styles.closeIcon}
                color={iconColor}
                onPress={() => {
                  onClearPress?.()
                }}
              />
            )}
            {rest?.right}
          </View>
        }
        onPress={(e) => {
          !viewOnly && setIsChipSelected((prev) => !prev)
          rest?.onPress?.(e)
        }}
        onBackgroundColorChange={setBackgroundColor}
      />
    </View>
  )
}

export default Chip

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'transparent',
    alignSelf: 'baseline',
    alignItems: 'center',
  },

  baseContainer: {
    flexWrap: 'wrap',
  },

  closeIcon: {
    paddingHorizontal: 2,
  },
})

const sizeStyle = {
  small: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 6, // 3 coming from text style
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
}

const sizeMap = {
  small: {
    fontSize: 13,
  },
  medium: {
    fontSize: 14,
  },
  large: {
    fontSize: 16,
  },
}

const checkIconSize = {
  small: 14,
  medium: 16,
  large: 18,
}
