import React, {useCallback, useMemo, useState} from 'react'
import {
  Icon,
  Text,
  useBlossomTheme,
  View,
} from '@react-native-blossom-ui/components'
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {MonthCalendarProps, MonthDayItem} from './types'
import {
  getAppendedDaysListForMonth,
  getDateWithDMY,
  getFormattedDate,
} from './utils'

const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function MonthCalendar(props: MonthCalendarProps) {
  const {colors, isDark, options} = useBlossomTheme()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth())
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear())

  const daysList = useMemo(() => {
    return getAppendedDaysListForMonth(currentMonth, currentYear)
  }, [currentMonth, currentYear])

  const onPrevPress = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((prevYear) => prevYear - 1)
        return 11
      }
      return prev - 1
    })
  }, [])

  const onNextPress = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((prevYear) => prevYear + 1)
        return 0
      }
      return prev + 1
    })
  }, [])

  const onTodayPress = useCallback(() => {
    const today = new Date()
    setSelectedDate(today)
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
  }, [])

  const onDatePress = useCallback((item: MonthDayItem) => {
    setSelectedDate(getDateWithDMY(item.day, item.month, item.year))
  }, [])

  const isDaySelected = useCallback(
    (item: MonthDayItem) => {
      if (
        item.day === selectedDate.getDate() &&
        item.month === selectedDate.getMonth() &&
        item.year === selectedDate.getFullYear()
      )
        return true
      return false
    },
    [selectedDate],
  )

  const isToday = useCallback(
    (day: number) => {
      const today = new Date()
      if (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      ) {
        return true
      }
      return false
    },
    [currentMonth, currentYear],
  )

  const formattedMonth = useMemo(() => {
    return getFormattedDate(
      getDateWithDMY(1, currentMonth, currentYear),
      'MMMM',
    )
  }, [currentMonth, currentYear])

  return (
    <View>
      <View row style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text>
          {formattedMonth} {currentYear}
          <Icon name="chevron-down" size={16} />
        </Text>
        <View row style={{alignItems: 'center'}}>
          <Icon name="chevron-back" onPress={onPrevPress} />
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.5}
            onPress={onTodayPress}>
            <Text style={{paddingHorizontal: 4}}>Today</Text>
          </TouchableOpacity>
          <Icon name="chevron-forward" onPress={onNextPress} />
        </View>
      </View>
      <FlatList
        data={daysList}
        numColumns={7}
        ListHeaderComponent={
          <View row>
            {weekArray.map((name) => (
              <View key={name} style={styles.day}>
                <Text
                  typography="c1"
                  style={{
                    color: colors.text300,
                  }}>
                  {name}
                </Text>
              </View>
            ))}
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.5}
            style={[
              styles.day,
              isDaySelected(item) && {
                backgroundColor: colors.primary500,
              },
              isToday(item.day) && {
                borderWidth: 1,
                borderColor: colors.primary500,
              },
            ]}
            onPress={() => onDatePress(item)}>
            <Text
              style={[
                !item.isCurrentMonth && {
                  color: colors.text400,
                },
                isDaySelected(item) && {
                  color: isDark ? colors.text100 : colors.text900,
                },
              ]}>
              {item.day}
            </Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  day: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
