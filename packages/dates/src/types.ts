import {BaseUIProps} from '@react-native-blossom-ui/components'

export interface MonthCalendarProps extends BaseUIProps {
  month?: number
  year?: number
  date?: string | Date
}

export interface MonthDayItem {
  day: number
  month: number
  year: number

  isCurrentMonth?: boolean
}
