import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  Pressable,
  StyleSheet,
  FlatList,
  View as RNView,
  Platform,
} from 'react-native'

import {useBlossomTheme} from '../../context'
import {Spacer, View} from '../view'
import {Icon} from '../icon'
import Popover from '../modal/Popover'
import SearchInput from '../input/SearchInput'
import SelectItem from './SelectItem'
import {SelectProps} from '../types'
import {useMergedProps} from '../../common'
import ActivityIndicator from '../loader/ActivityIndicator'
import {BottomSheet, useCalculatedPosition} from '../modal'
import {Text} from '../text'

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
  const [showBottomSheet, setShowBottomSheet] = useState(false)
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
    if (disabled) return

    if (Platform.OS === 'android') {
      setShowBottomSheet(true)
    } else {
      setShowPicker(true)
    }
  }, [disabled])

  const closePicker = useCallback(() => {
    setShowPicker(false)
    setShowBottomSheet(false)
  }, [])

  const RightView = useCallback(
    () => (
      <View row style={styles.rightViewContainer}>
        {isLoading && <ActivityIndicator size="small" style={styles.loader} />}
        {clearable && getDisplayValue() && (
          <Icon
            family="Ionicons"
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
          family="Ionicons"
          name="chevron-down"
          size={24}
          color={disabled ? colors.text500 : colors.text100}
        />
      </View>
    ),
    [
      disabled,
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
      onBackdropPress={closePicker}
      Target={
        <Pressable
          ref={anchorRef}
          accessibilityRole="button"
          onPress={openPicker}>
          <SearchInput
            accessibilityLabel="Select input field"
            left={null}
            right={<RightView />}
            inputContainerStyle={[
              disabled && {
                backgroundColor: colors.background200,
              },
            ]}
            inputTextStyle={[
              !disabled && {
                color: colors.text100,
              },
            ]}
            label={label}
            placeholder={placeholder}
            value={getDisplayValue()}
            disabled={disabled || !searchable}
            shouldMockDisableState
            // onPressOut={openPicker}
            pointerEvents="none"
            status={status}
            size={size}
            {...inputProps}
          />
          <BottomSheet
            visible={showBottomSheet}
            onBackdropPress={closePicker}
            contentStyle={pickerProps?.style}>
            {placeholder ? <Text typography="s1">{placeholder}</Text> : null}
            <Spacer height={4} />
            <FlatList
              ref={flatListRef}
              data={options}
              keyExtractor={(item) => item.label}
              {...pickerProps}
              renderItem={({item, index, separators}) =>
                renderItem ? (
                  <Pressable
                    accessibilityRole="menuitem"
                    onPress={() => {
                      if (item.disabled) return

                      setSelectedValue(item.value)
                      onValueChange?.(item.value, item, index)
                      closePicker()
                    }}>
                    {renderItem({item, index, separators})}
                  </Pressable>
                ) : (
                  <SelectItem
                    size={size}
                    item={item}
                    isSelected={index === getSelectedIndex()}
                    onPress={() => {
                      setSelectedValue(item.value)
                      onValueChange?.(item.value, item, index)
                      closePicker()
                    }}
                  />
                )
              }
            />
          </BottomSheet>
        </Pressable>
      }>
      <FlatList
        ref={flatListRef}
        data={options}
        keyExtractor={(item) => item.label}
        {...pickerProps}
        renderItem={({item, index, separators}) =>
          renderItem ? (
            <Pressable
              accessibilityRole="menuitem"
              onPress={() => {
                if (item.disabled) return

                setSelectedValue(item.value)
                onValueChange?.(item.value, item, index)
                closePicker()
              }}>
              {renderItem({item, index, separators})}
            </Pressable>
          ) : (
            <SelectItem
              size={size}
              item={item}
              isSelected={index === getSelectedIndex()}
              onPress={() => {
                setSelectedValue(item.value)
                onValueChange?.(item.value, item, index)
                closePicker()
              }}
            />
          )
        }
      />
    </Popover>
  )
}

export default Select

const styles = StyleSheet.create({
  rightViewContainer: {
    backgroundColor: 'transparent',
  },
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
