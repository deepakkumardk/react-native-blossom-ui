import React, {forwardRef, useCallback, useEffect, useState} from 'react'
import {TextInput as RNTextInput} from 'react-native'

import {SearchInputProps} from '../types'

import TextInput, {textInputSizeStylesMap} from './TextInput'
import {useDebouncedValue} from './useDebouncedValue'
import {Icon} from '../icon'
import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import AnimatedPlaceholder from './AnimatedPlaceholder'
import {View} from '../view'

/**
 * Uncontrolled SearchInput with debouncing & animated placeholder support
 */
const SearchInput = (props: SearchInputProps, ref: React.Ref<RNTextInput>) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    debounceDelay,
    onQueryChange,
    status,
    animatedPlaceholderProps,
    ...rest
  } = useMergedProps('SearchInput', props, {colors, isDark})

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedValue = useDebouncedValue(searchQuery, debounceDelay)

  const [leftWidth, setLeftWidth] = useState(18)

  const onClearPress = useCallback(() => {
    setSearchQuery('')
  }, [])

  useEffect(() => {
    onQueryChange?.(debouncedValue)
  }, [debouncedValue, onQueryChange])

  return (
    <TextInput
      ref={ref}
      value={searchQuery}
      onChangeText={setSearchQuery}
      right={
        searchQuery ? (
          <Icon
            family="Ionicons"
            status={status}
            name="close"
            size={18}
            onPress={onClearPress}
          />
        ) : null
      }
      placeholderComponent={
        animatedPlaceholderProps?.placeholders?.length ? (
          <AnimatedPlaceholder
            {...animatedPlaceholderProps}
            visible={!searchQuery}
            containerStyle={[
              {
                paddingLeft:
                  leftWidth +
                  (!rest?.mode || rest?.mode === 'outlined'
                    ? textInputSizeStylesMap[rest?.size || 'medium'].outlined
                        .padding
                    : 0),
              },
              animatedPlaceholderProps?.containerStyle,
            ]}
            textStyle={[
              {
                color: colors.text400,
              },
              animatedPlaceholderProps?.textStyle,
            ]}
          />
        ) : null
      }
      {...rest}
      left={
        <View
          onLayout={({nativeEvent}) => {
            setLeftWidth(nativeEvent.layout.width + 6)
          }}>
          {rest?.left !== undefined ? (
            rest?.left
          ) : (
            <Icon family="Ionicons" status={status} name="search" size={18} />
          )}
        </View>
      }
    />
  )
}

export default forwardRef(SearchInput)
