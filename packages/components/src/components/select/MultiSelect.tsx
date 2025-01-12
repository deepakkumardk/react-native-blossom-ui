import React, {useCallback, useEffect, useState} from 'react'

import Select from './Select'
import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import {MultiSelectProps, SelectItemT} from '../types'
import SelectItem from './SelectItem'
import {Checkbox} from '../formFields'

/**
 * Multi selection input with checkbox & comes with controlled & uncontrolled input
 */
const MultiSelect = <T,>(props: MultiSelectProps<T>) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    values = [],
    onValuesChange,
    disabled,
    maxSelectCount,
    label,
    placeholder,
    defaultValue,
    ...rest
  } = useMergedProps('MultiSelect', props, {colors, isDark})

  const [selectedItems, setSelectedItems] = useState<SelectItemT<T>[]>([])
  const [selectedValues, setSelectedValues] = useState<T[]>(values)

  useEffect(() => {
    if (!defaultValue) return
    // Set the default value for the first time, on mount
    setSelectedValues(defaultValue)
    // Find the default items array from the given default value
    const defaultItems = defaultValue.map(
      (item) =>
        rest.options?.find(
          (optionItem) =>
            JSON.stringify(optionItem.value) === JSON.stringify(item),
        ) as SelectItemT<T>,
    )
    setSelectedItems(defaultItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDisplayValue = useCallback(() => {
    return selectedItems.map((item) => item.label).join(', ')
  }, [selectedItems])

  const handleValueChange = useCallback(
    (selectedItem?: SelectItemT<T>) => {
      if (!selectedItem) {
        // Clear the selection if get `undefined` i.e. on clear icon press
        setSelectedItems([])
        setSelectedValues([])
        return
      }
      let nextItems = [...selectedItems]
      let nextValues = [...selectedValues]

      const indexFoundValue = selectedItems.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(selectedItem),
      )

      if (indexFoundValue === -1) {
        // Return if max selection exceeds
        if (maxSelectCount && nextValues.length >= maxSelectCount) {
          return
        }

        // Add the item if not found
        nextItems.push(selectedItem)
        nextValues.push(selectedItem.value)
      } else {
        // Remove the item if found
        nextItems = selectedItems.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(selectedItem),
        )
        nextValues = selectedValues.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(selectedItem),
        )
      }
      onValuesChange?.(nextValues, selectedItems)
      setSelectedItems(nextItems)
      setSelectedValues(nextValues)
    },
    [selectedItems, selectedValues, maxSelectCount, onValuesChange],
  )

  const isItemSelected = useCallback(
    (targetItem: SelectItemT<T>) => {
      return !!selectedItems?.find(
        (item) => JSON.stringify(item) === JSON.stringify(targetItem),
      )
    },
    [selectedItems],
  )

  return (
    <Select
      label={label}
      placeholder={placeholder}
      displayValue={getDisplayValue()}
      renderItem={({item}) => (
        <SelectItem
          size={rest?.size}
          item={item}
          leftIcon={
            <Checkbox
              value={isItemSelected(item)}
              onValueChange={() => handleValueChange(item)}
              disabled={item.disabled}
              size="small"
            />
          }
          isSelected={isItemSelected(item)}
          onPress={() => handleValueChange(item)}
        />
      )}
      {...rest}
      disabled={disabled}
      onValueChange={undefined}
      onClearPress={() => {
        rest?.onClearPress?.()
        handleValueChange(undefined)
      }}
      value={undefined}
    />
  )
}

export default MultiSelect
