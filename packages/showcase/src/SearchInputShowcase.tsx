import React from 'react'

import {View, SearchInput} from '@react-native-blossom-ui/components'

export function SearchInputUsage() {
  return (
    <View>
      <SearchInput
        label="Search user"
        placeholder="eg. Blossom"
        size="medium"
      />
    </View>
  )
}

export function SearchInputSizes() {
  return (
    <View>
      <SearchInput label="Search user" placeholder="eg. Blossom" size="small" />
      <SearchInput
        label="Search user"
        placeholder="eg. Blossom"
        size="medium"
      />
      <SearchInput label="Search user" placeholder="eg. Blossom" size="large" />
    </View>
  )
}

export function SearchInputModes() {
  return (
    <View>
      <SearchInput label="Search user" placeholder="eg. Blossom" mode="flat" />
      <SearchInput
        label="Search user"
        placeholder="eg. Blossom"
        size="medium"
        mode="outlined"
      />
    </View>
  )
}

export function SearchInputDense() {
  return (
    <View>
      <SearchInput label="Label" placeholder="Placeholder" mode="flat" dense />
      <SearchInput label="Label" placeholder="Placeholder" dense />
    </View>
  )
}
