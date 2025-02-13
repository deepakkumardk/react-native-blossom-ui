import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native'

import {Text, useBlossomTheme} from '@react-native-blossom-ui/components'

import {getYearsList} from '../utils'
import {YearListProps, YearsListRef} from '../types'

const WINDOW_SIZE = 12

/**
 * Show a list of years in a flat list
 */
function YearList(
  {currentYear, minYear, maxYear, onItemPress}: YearListProps,
  ref: React.Ref<YearsListRef>,
) {
  const {colors} = useBlossomTheme()

  const [firstYear, setFirstYear] = useState(currentYear)
  const [years, setYears] = useState<number[]>([])

  useEffect(() => {
    const newList = getYearsList({currentYear: firstYear, minYear, maxYear})
    if (newList.length) {
      setYears(newList)
    }
  }, [firstYear, maxYear, minYear])

  useImperativeHandle(ref, () => {
    return {
      loadPrevYears: () => {
        setFirstYear((prev) => prev - WINDOW_SIZE)
      },
      loadNextYears: () => {
        setFirstYear((prev) => prev + WINDOW_SIZE)
      },
      hasMinYear: () => !!(minYear && years.includes(minYear)),
      hasMaxYear: () => !!(maxYear && years.includes(maxYear)),
    }
  }, [maxYear, minYear, years])

  useEffect(() => {
    setFirstYear(currentYear)
  }, [currentYear])

  return (
    <FlatList
      data={years}
      numColumns={4}
      scrollEnabled={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.5}
          style={[styles.day]}
          onPress={() => onItemPress(item)}>
          <Text
            style={[
              currentYear === item && {
                color: colors.primary500,
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default forwardRef(YearList)

const styles = StyleSheet.create({
  day: {
    width: 60,
    height: 40,
    margin: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
