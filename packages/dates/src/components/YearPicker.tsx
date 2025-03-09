import React, {useEffect, useState} from 'react'
import {
  Select,
  useBlossomTheme,
  SelectItemT,
  useMergedProps,
} from '@react-native-blossom-ui/components'
import {YearPickerProps} from '../types'

import {getYearsListForSelect} from '../utils'

/**
 * Show a list of years based on the props
 */
function YearPicker(props: YearPickerProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    currentYear = new Date().getFullYear(),
    minYear,
    maxYear,
    onItemPress,
  } = useMergedProps('YearPicker', props, {
    colors,
    isDark,
  })

  const [years, setYears] = useState<SelectItemT<number>[]>([])
  const [selectedYear, setSelectedYear] = useState(currentYear)

  useEffect(() => {
    const newList = getYearsListForSelect({minYear, maxYear})

    if (newList.length) {
      setYears(newList.map((value) => ({label: value.toString(), value})))
    }
  }, [currentYear, minYear, maxYear])

  return (
    <Select
      placeholder="Year"
      value={selectedYear}
      options={years}
      onValueChange={(value) => {
        if (value) {
          onItemPress?.(Number(value))
          setSelectedYear(value)
        }
      }}
    />
  )
}

export default YearPicker
