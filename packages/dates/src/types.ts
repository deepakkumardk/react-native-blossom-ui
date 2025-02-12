import {BaseUIProps} from '@react-native-blossom-ui/components'

export interface MonthCalendarProps extends BaseUIProps {
  month?: number
  year?: number
  date?: string | Date

  // monthListProps?: MonthNamesListProps
  yearListProps?: Pick<YearListProps, 'minYear' | 'maxYear'>
}

export interface MonthDaysListProps {
  selectedDate?: Date
  currentMonth: number
  currentYear: number
  onItemPress?: (item: MonthDayItem) => void
}

export interface MonthNamesListProps {
  currentMonth: number
  onItemPress?: (monthIndex: number) => void
}

export interface YearListProps {
  currentYear: number
  minYear?: number
  maxYear?: number
  onItemPress: (monthIndex: number) => void
}

export interface MonthDayItem {
  day: number
  month: number
  year: number

  isCurrentMonth?: boolean
}

export interface YearsListRef {
  loadPrevYears: () => void
  loadNextYears: () => void

  hasMinYear: () => boolean
  hasMaxYear: () => boolean
}
