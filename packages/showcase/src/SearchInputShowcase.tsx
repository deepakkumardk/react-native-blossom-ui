import React from 'react'

import {View, SearchInput, Icon} from '@react-native-blossom-ui/components'

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

export function SearchInputWithClearIcon() {
  return (
    <View>
      <SearchInput
        label="Search user"
        placeholder="Type to search"
        size="medium"
        withClearIcon
      />
    </View>
  )
}

export function AnimatedSearchInput() {
  const placeholders = [
    `Search 'Awesome'`,
    `Search 'Blossom'`,
    `Search 'Rose'`,
    `Search 'Daisy'`,
    `Search 'Tulip'`,
    `Search 'Orchid'`,
  ]

  return (
    <View>
      <SearchInput
        label="Search Label"
        size="medium"
        animatedPlaceholderProps={{
          placeholders,
        }}
        left={<Icon name="search" size={24} />}
      />
      <SearchInput
        label="Search Placeholder"
        mode="flat"
        animatedPlaceholderProps={{
          placeholders,
        }}
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

      <SearchInput
        mode="flat"
        label="Search user"
        placeholder="eg. Blossom"
        size="small"
      />
      <SearchInput
        mode="flat"
        label="Search user"
        placeholder="eg. Blossom"
        size="medium"
      />
      <SearchInput
        mode="flat"
        label="Search user"
        placeholder="eg. Blossom"
        size="large"
      />
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
