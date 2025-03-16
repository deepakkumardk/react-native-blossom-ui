import {StyleProp, ViewStyle} from 'react-native'
import {BaseUIProps, TextInputProps} from '@react-native-blossom-ui/components'

/**
 * Represents a day within a month.
 */
export interface MonthDayItem {
  /**
   * The day of the month (1-31).
   */
  day: number
  /**
   * The month the day belongs to (0-based index, 0 = January, 11 = December).
   */
  month: number
  /**
   * The year the day belongs to.
   */
  year: number
  /**
   * Indicates whether the day belongs to the current displayed month.
   * If false, the day might be from the previous or next month.
   */
  isCurrentMonth?: boolean
}

/**
 * Props for displaying a list of days in a month.
 */
export interface MonthDaysListProps {
  /**
   * The currently selected date.
   */
  selectedDate?: Date
  /**
   * The month currently being displayed (0-based index).
   */
  currentMonth: number
  /**
   * The year currently being displayed.
   */
  currentYear: number
  /**
   * An array of disabled dates in the MonthDayItem format
   */
  disableDates?: Array<MonthDayItem>
  /**
   * Callback for when a day is pressed.
   * @param item The selected day item.
   */
  onItemPress?: (item: MonthDayItem) => void
}

/**
 * Props for displaying a list of month names.
 */
export interface MonthNamesListProps {
  /**
   * The currently selected month (0-based index).
   */
  currentMonth: number
  /**
   * Callback for when a month is pressed.
   * @param monthIndex The index of the selected month (0-based).
   */
  onItemPress?: (monthIndex: number) => void
  /**
   * select input container style
   */
  containerStyle?: StyleProp<ViewStyle>
}

export type MonthPickerProps = Partial<MonthNamesListProps>

/**
 * Props for displaying a list of years.
 */
export interface YearListProps {
  /**
   * The currently selected year.
   */
  currentYear: number
  /**
   * The minimum selectable year.
   */
  minYear?: number
  /**
   * The maximum selectable year.
   */
  maxYear?: number
  /**
   * Callback triggered when a year is selected.
   * @param year The selected year.
   */
  onItemPress: (year: number) => void
}

export type YearPickerProps = Partial<YearListProps>

export interface DateSelectPickerProps extends BaseUIProps {
  /**
   * Month Props to control the Month Picker
   */
  monthProps?: MonthPickerProps
  /**
   * Year Props to control the Year Picker
   */
  yearProps?: YearPickerProps

  /**
   * Callback fired when all there pickers are selected
   * @param date objet with day,month,year
   */
  onDateComplete?: (date: Omit<MonthDayItem, 'isCurrentMonth'>) => void
}

/**
 * Ref object for handling the years list.
 */
export interface YearsListRef {
  /**
   * Load the previous set of years.
   */
  loadPrevYears: () => void
  /**
   * Load the next set of years.
   */
  loadNextYears: () => void
  /**
   * Check if there are more years available before the minYear.
   * @returns Boolean indicating if more years can be loaded.
   */
  hasMinYear: () => boolean
  /**
   * Check if there are more years available beyond the maxYear.
   * @returns Boolean indicating if more years can be loaded.
   */
  hasMaxYear: () => boolean
}

/**
 * Props for the Calendar component.
 */
export interface CalendarProps extends BaseUIProps {
  /**
   * The default selected date.
   * Can be a string (formatted date) or a Date object.
   */
  selectedDate?: string | Date
  /**
   * The format in which the date should be displayed inside the input value
   */
  displayDateFormat?: string
  /**
   * The format in which the selected date should give output
   * And this format should be used whenever you are passing any date to this component
   */
  outputDateFormat?: string
  /**
   * An array of disabled dates of string (in outputDateFormat) or a Date object.
   * Make sure to provide the outputDateFormat prop too if passing date as string
   */
  disableDates?: Array<string | Date>
  /**
   * Callback triggered when a date is selected.
   * @param date The selected date as a Date object.
   * @param displayDate The selected date formatted for display.
   * @param outputDate The selected date formatted for output.
   */
  onDateChange?: (
    date?: Date,
    displayDate?: string,
    outputDate?: string,
  ) => void
  /**
   * Props for configuring the year list (min and max year).
   */
  yearListProps?: Pick<YearListProps, 'minYear' | 'maxYear'>
}

/**
 * Base properties for a date picker component.
 */
export type BaseDatePickerProps = Omit<TextInputProps, 'value'> &
  Pick<
    CalendarProps,
    'displayDateFormat' | 'outputDateFormat' | 'disableDates' | 'onDateChange'
  >

/**
 * Props for the DatePicker component.
 */
export interface DatePickerProps extends BaseDatePickerProps {
  /**
   * The default selected date.
   * Can be a string (formatted date) or a Date object.
   */
  defaultDate?: string | Date
  /**
   * Whether the date picker allows clearing the selected date.
   */
  clearable?: boolean
}
