import React, {useCallback, useRef, useState} from 'react'
import {Pressable, StyleSheet, FlatList, View as RNView} from 'react-native'

import {useBlossomTheme} from '../../context'
import View from '../view'
import Icon from '../icon'
import Popover from '../modal/Popover'
import SearchInput from '../input/SearchInput'
import SelectItem from './SelectItem'
import {SelectProps} from '../types'
import {useMergedProps} from '../../common'

const PICKER_HEIGHT = 180

/**
 * Select Input component for single select
 */
const Select = <T,>(props: SelectProps<T>) => {
  const {colors, isDark, options: themeOptions} = useBlossomTheme()

  const {
    options = [],
    value,
    displayValue,
    onValueChange,
    searchable,
    clearable,
    // TODO add support
    defaultValue,
    disabled,
    placeholder = 'Select Option',
    pickerHeight = PICKER_HEIGHT,
    status,
    size,
    ...rest
  } = useMergedProps('Select', props, {colors, isDark})

  const anchorRef = useRef<RNView>(null)
  const flatListRef = useRef<FlatList>(null)

  const [showPicker, setShowPicker] = useState(false)

  const getSelectedIndex = useCallback(() => {
    return options.findIndex(
      (item) => JSON.stringify(item.value) === JSON.stringify(value),
    )
  }, [options, value])

  const getDisplayValue = useCallback(() => {
    return displayValue || options[getSelectedIndex()]?.label || ''
  }, [displayValue, options, getSelectedIndex])

  const openPicker = useCallback(() => {
    !disabled && setShowPicker((prev) => !prev)
  }, [disabled])

  return (
    <View>
      <Pressable
        ref={anchorRef}
        accessibilityRole="button"
        onPress={openPicker}>
        <SearchInput
          accessibilityLabel="Select input field"
          left={null}
          right={
            <View row>
              {clearable && getDisplayValue() && (
                <Icon
                  name="close"
                  size={24}
                  style={styles.closeIcon}
                  color={colors.background700}
                  onPress={() => onValueChange?.(undefined)}
                />
              )}
              <Icon
                name="chevron-down"
                size={24}
                color={disabled ? colors.text500 : colors.text100}
              />
            </View>
          }
          textStyle={[
            !disabled && {
              color: colors.text100,
            },
          ]}
          placeholder={placeholder}
          value={getDisplayValue()}
          disabled={disabled || !searchable}
          onPressOut={openPicker}
          status={status}
          size={size}
        />
      </Pressable>

      <Popover
        targetRef={anchorRef}
        visible={showPicker}
        fitTargetWidth
        contentStyle={[
          styles.popover,
          {
            maxHeight: pickerHeight,
            backgroundColor: colors.background100,
            borderRadius: themeOptions?.borderRadius,
            borderColor: colors.background500,
          },
        ]}
        onBackdropPress={() => setShowPicker(false)}>
        <FlatList
          ref={flatListRef}
          data={options}
          keyExtractor={(item) => item.label}
          renderItem={({item, index}) => (
            <SelectItem
              size={size}
              item={item}
              isSelected={index === getSelectedIndex()}
              onPress={() => {
                onValueChange?.(item)
                setShowPicker(false)
              }}
            />
          )}
          {...rest}
        />
      </Popover>
    </View>
  )
}

export default Select

const styles = StyleSheet.create({
  closeIcon: {
    paddingHorizontal: 4,
  },
  popover: {
    borderWidth: 1,
    padding: 0,
  },
})
