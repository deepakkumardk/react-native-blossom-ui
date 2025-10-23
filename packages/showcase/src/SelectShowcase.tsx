import React, {useState} from 'react'

import {Select, Text, View} from '@react-native-blossom-ui/components'

const OPTIONS = Array(25)
  .fill(0)
  .map((_, i) => ({
    label: `Option ${i}`,
    value: i,
    disabled: i % 4 === 0,
  }))

export function SelectUsage() {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(-1)

  return (
    <Select
      label="Select Label"
      placeholder="Select An Option"
      options={OPTIONS}
      value={selectedValue}
      onValueChange={(value) => setSelectedValue(value)}
    />
  )
}

export function SelectDefaultValue() {
  return <Select options={OPTIONS} defaultValue={3} />
}

export function SelectClearable() {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(-1)

  return (
    <Select
      options={OPTIONS}
      value={selectedValue}
      clearable
      onValueChange={(value) => setSelectedValue(value)}
    />
  )
}

export function SelectLoading() {
  return <Select options={OPTIONS} isLoading />
}

export function SelectMode() {
  return (
    <View>
      <Select
        label="Inline Mode"
        placeholder="Select An Option"
        options={OPTIONS}
        mode="inline"
      />
      <Select
        label="bottom-sheet Mode"
        placeholder="Select An Option"
        options={OPTIONS}
        mode="bottom-sheet"
      />
    </View>
  )
}

export function SelectCustomItem() {
  return (
    <Select
      options={OPTIONS}
      renderItem={({item, index}) => (
        <Text
          typography="h6"
          status={index % 2 === 0 ? 'primary' : 'accent'}
          style={{padding: 8}}>
          {item.label}
        </Text>
      )}
    />
  )
}

export function SelectCustomStyle() {
  return (
    <Select
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

export function SelectCustomPickerStyle() {
  return (
    <Select
      options={OPTIONS}
      label="Custom Select Label"
      placeholder="Custom Select Label"
      pickerProps={{
        style: {
          backgroundColor: 'yellow',
        },
      }}
    />
  )
}

export function SelectDisabled() {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(-1)

  return (
    <Select
      disabled
      options={OPTIONS}
      value={selectedValue}
      onValueChange={(value) => setSelectedValue(value)}
    />
  )
}

export function SelectObjectOptions() {
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

  const [selectedValue, setSelectedValue] = useState<
    (typeof FRUIT_LIST)[0]['value'] | undefined
  >(undefined)

  return (
    <Select
      options={FRUIT_LIST}
      value={selectedValue}
      clearable
      onValueChange={(value, item) => {
        setSelectedValue(value)
        alert(`Selected Value\n${JSON.stringify(item)}`)
      }}
    />
  )
}
