import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Pressable, StyleSheet, FlatList, View as RNView} from 'react-native'

import {useBlossomTheme} from '../../context'
import {View} from '../view'
import {Icon} from '../icon'
import Popover from '../modal/Popover'
import SearchInput from '../input/SearchInput'
import SelectItem from './SelectItem'
import {SelectProps} from '../types'
import {useMergedProps} from '../../common'
import ActivityIndicator from '../loader/ActivityIndicator'
import {useCalculatedPosition} from '../modal'

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
    onClearPress,
    searchable,
    clearable,
    defaultValue,
    isLoading,
    disabled,
    label,
    placeholder = 'Select Option',
    pickerHeight = PICKER_HEIGHT,
    pickerProps,
    status,
    size,
    renderItem,
    inputProps,
  } = useMergedProps('Select', props, {colors, isDark})

  const anchorRef = useRef<RNView>(null)
  const flatListRef = useRef<FlatList>(null)

  const [showPicker, setShowPicker] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)

  const {offset, pickerPosition} = useCalculatedPosition(
    pickerHeight,
    showPicker,
    anchorRef,
  )

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    // Set the default value for the first time, on mount
    setSelectedValue(defaultValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSelectedIndex = useCallback(() => {
    return options.findIndex(
      (item) => JSON.stringify(item.value) === JSON.stringify(selectedValue),
    )
  }, [options, selectedValue])

  const getDisplayValue = useCallback(() => {
    return displayValue || options[getSelectedIndex()]?.label || ''
  }, [displayValue, options, getSelectedIndex])

  const openPicker = useCallback(() => {
    !disabled && setShowPicker((prev) => !prev)
  }, [disabled])

  const RightView = useCallback(
    () => (
      <View
        row
        style={[
          disabled && {
            backgroundColor: colors.background200,
          },
        ]}>
        {isLoading && <ActivityIndicator size="small" style={styles.loader} />}
        {clearable && getDisplayValue() && (
          <Icon
            name="close"
            size={24}
            style={styles.closeIcon}
            color={colors.background700}
            onPress={() => {
              onClearPress?.()
              onValueChange?.(undefined)
            }}
          />
        )}
        <Icon
          name="chevron-down"
          size={24}
          color={disabled ? colors.text500 : colors.text100}
        />
      </View>
    ),
    [
      disabled,
      colors.background200,
      colors.background700,
      colors.text500,
      colors.text100,
      isLoading,
      clearable,
      getDisplayValue,
      onClearPress,
      onValueChange,
    ],
  )

  return (
    <Popover
      targetRef={anchorRef}
      visible={showPicker}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position={pickerPosition}
      offset={offset}
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
      onBackdropPress={() => setShowPicker(false)}
      Target={
        <Pressable
          ref={anchorRef}
          accessibilityRole="button"
          onPress={openPicker}>
          <SearchInput
            accessibilityLabel="Select input field"
            left={null}
            right={<RightView />}
            inputStyle={[
              disabled && {
                backgroundColor: colors.background200,
              },
            ]}
            textStyle={[
              !disabled && {
                color: colors.text100,
              },
            ]}
            label={label}
            placeholder={placeholder}
            value={getDisplayValue()}
            disabled={disabled || !searchable}
            shouldMockDisableState
            onPressOut={openPicker}
            status={status}
            size={size}
            {...inputProps}
          />
        </Pressable>
      }>
      <FlatList
        ref={flatListRef}
        data={options}
        keyExtractor={(item) => item.label}
        {...pickerProps}
        renderItem={
          renderItem ||
          (({item, index}) => (
            <SelectItem
              size={size}
              item={item}
              isSelected={index === getSelectedIndex()}
              onPress={() => {
                setSelectedValue(item.value)
                onValueChange?.(item.value, item, index)
                setShowPicker(false)
              }}
            />
          ))
        }
        {...pickerProps}
      />
    </Popover>
  )
}

export default Select

const styles = StyleSheet.create({
  closeIcon: {
    paddingHorizontal: 4,
  },
  loader: {
    paddingHorizontal: 4,
  },
  popover: {
    borderWidth: 1,
    padding: 0,
  },
})
