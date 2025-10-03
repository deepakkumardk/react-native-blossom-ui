import React, {useCallback, useState} from 'react'
import {StyleSheet} from 'react-native'
import {View} from '../view'
import {SegmentedButtonProps} from '../types'
import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import Chip from './Chip'

/**
 * A button group component with selected props to show multiple group buttons
 */
const SegmentedButton = (props: SegmentedButtonProps) => {
  const {colors, isDark, options} = useBlossomTheme()

  const {
    data = [],
    fullWidth,
    borderRadius,
    withVerticalDivider,
    multiSelect,
    activeColor,
    inactiveColor,
    onPress,
    status = 'primary',
    mode,
    size = 'medium',
    ...rest
  } = useMergedProps('SegmentedButton', props, {colors, isDark})

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  const getMode = useCallback(
    (index: number) => {
      return rest.disabled
        ? 'tinted'
        : mode || (selectedIndexes.includes(index) ? 'tinted' : 'outlined')
    },
    [mode, rest.disabled, selectedIndexes],
  )

  return (
    <View row style={[styles.container, rest.style]}>
      {data?.map((item, index) => (
        <Chip
          key={item.value || item.label || index}
          mode={getMode(index)}
          titleStyle={[
            getMode(index) !== 'filled' && {
              color: colors.text200,
            },
            (rest.disabled || item.disabled) && {
              color: colors.text500,
            },
          ]}
          status={status}
          size={size}
          withCheckIcon
          {...item}
          isSelected={item.isSelected || selectedIndexes.includes(index)}
          disabled={item.disabled || rest.disabled}
          style={[
            styles.itemButton,
            sizeStyle[size],
            {
              borderColor: colors.background900,
            },
            activeColor && selectedIndexes.includes(index)
              ? {
                  backgroundColor: activeColor,
                }
              : {},
            inactiveColor && !selectedIndexes.includes(index)
              ? {
                  backgroundColor: inactiveColor,
                }
              : {},
            index === 0 && {
              borderTopLeftRadius: borderRadius ?? options?.borderRadius,
              borderBottomLeftRadius: borderRadius ?? options?.borderRadius,
            },
            index === data.length - 1 && {
              borderTopRightRadius: borderRadius ?? options?.borderRadius,
              borderBottomRightRadius: borderRadius ?? options?.borderRadius,
            },
            index !== data.length - 1 &&
              withVerticalDivider && {
                borderEndWidth: 0.1,
                borderColor: colors.background500,
              },
            item.style,
          ]}
          onPress={() => {
            setSelectedIndexes((prev) => {
              if (prev.includes(index)) {
                return prev.filter((itemValue) => itemValue !== index)
              }
              return multiSelect ? prev.concat(index) : [index]
            })
            onPress?.(item.value || item.label || '', index)
          }}
        />
      ))}
    </View>
  )
}

export default SegmentedButton

const styles = StyleSheet.create({
  container: {
    alignSelf: 'baseline',
  },
  control: {
    padding: 8,
  },
  label: {
    paddingStart: 4,
  },
  itemButton: {
    borderRadius: 0,
    // TODO handle left and right width
    borderWidth: 0.5,
  },
})

const sizeStyle = {
  small: {
    paddingVertical: 6,
  },
  medium: {
    paddingVertical: 9,
  },
  large: {
    paddingVertical: 12,
  },
}
