import React, {useState} from 'react'

import {View} from '@react-native-blossom-ui/components'
import {Calendar} from '@react-native-blossom-ui/dates'

export function CalendarUsage() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <View>
      <Calendar
        selectedDate={date}
        onDateChange={(value?: Date) => setDate(value)}
      />
    </View>
  )
}
