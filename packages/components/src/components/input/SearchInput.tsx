import React, {forwardRef, useEffect, useState} from 'react'
import {TextInput as RNTextInput} from 'react-native'

import {SearchInputProps} from '../types'

import TextInput from './TextInput'
import {useDebouncedValue} from './useDebouncedValue'
import Icon from '../icon'
import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'

/**
 * Uncontrolled SearchInput with debouncing support
 */
const SearchInput = (props: SearchInputProps, ref: React.Ref<RNTextInput>) => {
  const {colors, isDark} = useBlossomTheme()

  const {debounceDelay, onQueryChange, status, ...rest} = useMergedProps(
    'SearchInput',
    props,
    {colors, isDark},
  )

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedValue = useDebouncedValue(searchQuery, debounceDelay)

  const onClearPress = () => {
    setSearchQuery('')
  }

  useEffect(() => {
    onQueryChange?.(debouncedValue)
  }, [debouncedValue, onQueryChange])

  return (
    <TextInput
      ref={ref}
      value={searchQuery}
      onChangeText={setSearchQuery}
      left={<Icon status={status} name="search" size={18} />}
      right={
        searchQuery ? (
          <Icon status={status} name="close" size={18} onPress={onClearPress} />
        ) : null
      }
      {...rest}
    />
  )
}

export default forwardRef(SearchInput)
