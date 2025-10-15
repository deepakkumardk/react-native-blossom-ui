import React, {useState} from 'react'

import {Checkbox, MultiSelect, View} from '@react-native-blossom-ui/components'

const OPTIONS = Array(25)
  .fill(0)
  .map((_, i) => ({
    label: `Option ${i}`,
    value: i,
    disabled: i % 4 === 0,
  }))

export function MultiSelectUsage() {
  return <MultiSelect options={OPTIONS} />
}

export function MultiSelectDefaultValue() {
  return <MultiSelect options={OPTIONS} defaultValue={[2, 4]} />
}

export function MultiSelectClearable() {
  return <MultiSelect options={OPTIONS} clearable />
}

export function MultiSelectMode() {
  return (
    <View>
      <MultiSelect
        label="Inline Mode"
        placeholder="Select An Option"
        mode="inline"
        options={OPTIONS}
      />
      <MultiSelect
        label="bottom-sheet Mode"
        placeholder="Select An Option"
        mode="bottom-sheet"
        options={OPTIONS}
      />
    </View>
  )
}

export function MultiSelectCustomStyle() {
  return (
    <MultiSelect
      options={OPTIONS}
      label="Custom Select Label"
      inputProps={{
        inputContainerStyle: {
          backgroundColor: 'cyan',
          borderColor: 'blue',
          borderWidth: 2,
        },
      }}
    />
  )
}

export function MultiSelectCustomPickerStyle() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])

  return (
    <MultiSelect
      options={OPTIONS}
      label="Custom Select Label"
      placeholder="Custom Select Label"
      pickerProps={{
        style: {
          backgroundColor: 'yellow',
        },
      }}
      values={selectedOptions}
      renderItem={({item}) => (
        <Checkbox
          label={item.label}
          adjacent={false}
          position="right"
          disabled={item.disabled}
          style={{
            marginVertical: 4,
          }}
          value={selectedOptions.includes(item.value)}
        />
      )}
      onValuesChange={(values) => setSelectedOptions(values)}
    />
  )
}

export function MultiSelectDisabled() {
  return <MultiSelect disabled options={OPTIONS} />
}

export function MultiSelectMaxSelect() {
  return (
    <View>
      <MultiSelect
        label="Inline Mode"
        placeholder="Select upto 2 options"
        mode="inline"
        maxSelectCount={2}
        options={OPTIONS}
      />
      <MultiSelect
        label="bottom-sheet Mode"
        placeholder="Select upto 2 options"
        mode="bottom-sheet"
        maxSelectCount={2}
        options={OPTIONS}
      />
    </View>
  )
}

export function MultiSelectControlled() {
  const [selectedValues, setSelectedValues] = useState<number[]>([])

  return (
    <MultiSelect
      options={OPTIONS}
      values={selectedValues}
      onValuesChange={(items) => setSelectedValues(items)}
    />
  )
}

export function MultiSelectObjectOptions() {
  const FRUIT_LIST = [
    {
      label: 'Red Apple',
      value: {id: 1, name: 'Apple'},
    },
    {
      label: 'Orange Orange',
      value: {id: 2, name: 'Orange'},
    },
    {
      label: 'Yellow Mango',
      value: {id: 3, name: 'Mango'},
    },
    {
      label: 'Yellow Papaya',
      value: {id: 4, name: 'Papaya'},
    },
  ]

  return <MultiSelect options={FRUIT_LIST} />
}
