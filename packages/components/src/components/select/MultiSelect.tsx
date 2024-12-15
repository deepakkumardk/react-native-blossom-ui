import React, {useCallback, useState} from 'react'

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
    pickerHeight,
    ...rest
  } = useMergedProps('MultiSelect', props, {colors, isDark})

  const [selectedValues, setSelectedValues] = useState<SelectItemT<T>[]>(values)

  const getDisplayValue = useCallback(() => {
    return selectedValues.map((item) => item.label).join(', ')
  }, [selectedValues])

  const handleValueChange = useCallback(
    (selectedItem?: SelectItemT<T>) => {
      if (!selectedItem) {
        // Clear the selection if get `undefined` i.e. on clear icon press
        setSelectedValues([])
        return
      }
      let nextValues = [...selectedValues]

      const indexFoundValue = selectedValues.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(selectedItem),
      )
      if (indexFoundValue === -1) {
        // Add the item if not found
        nextValues.push(selectedItem)
      } else {
        // Remove the item if found
        nextValues = selectedValues.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(selectedItem),
        )
      }
      onValuesChange?.(nextValues)
      setSelectedValues(nextValues)
    },
    [selectedValues, onValuesChange],
  )

  const isItemSelected = useCallback(
    (targetItem: SelectItemT<T>) => {
      return !!selectedValues?.find(
        (item) => JSON.stringify(item) === JSON.stringify(targetItem),
      )
    },
    [selectedValues],
  )

  return (
    <Select
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
          onPress={() => {
            handleValueChange(item)
          }}
        />
      )}
      {...rest}
      onValueChange={handleValueChange}
      value={undefined}
    />
  )
}

export default MultiSelect
