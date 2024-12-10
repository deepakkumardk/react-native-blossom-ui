import React, {useState} from 'react'

import {Select} from '@react-native-blossom-ui/components'

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
      options={OPTIONS}
      value={selectedValue}
      onValueChange={(item) => setSelectedValue(item?.value)}
    />
  )
}

export function SelectClearable() {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(-1)

  return (
    <Select
      options={OPTIONS}
      value={selectedValue}
      clearable
      onValueChange={(item) => setSelectedValue(item?.value)}
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
      onValueChange={(item) => setSelectedValue(item?.value)}
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
      onValueChange={(item) => {
        setSelectedValue(item?.value)
        alert(`Selected Value\n${JSON.stringify(item?.value)}`)
      }}
    />
  )
}
