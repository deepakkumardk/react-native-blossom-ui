import {StyleProp, TextStyle, ViewStyle} from 'react-native'
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
   * The day of the week (0 = Sunday, 6 = Saturday).
   */
  weekDay?: number
  /**
   * Indicates whether the day belongs to the current displayed month.
   * If false, the day might be from the previous or next month.
   */
  isCurrentMonth?: boolean
}

export interface DayItemProps
  extends Pick<BaseDateProps, 'showAdjacentMonthDays'> {
  /**
   * Object for the given date in the month
   */
  item: MonthDayItem
  /**
   * is Date disabled
   */
  isDateDisabled: boolean

  /**
   * Callback when day item is pressed
   * @param item day item in dmy format
   */
  onItemPress?: (item: MonthDayItem) => void

  /**
   * Container style for the day item
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Text style for the day item
   */
  textStyle?: StyleProp<TextStyle>
}

/**
 * Props for displaying a list of days in a month.
 */
export interface MonthDaysListProps extends BaseDateProps {
  /**
   * The currently selected date for single date selection mode.
   */
  selectedDate?: Date
  /**
   * The currently selected dates for multiple date selection mode.
   */
  selectedDates?: Date[]
  /**
   * The currently selected end date for range date selection mode.
   */
  selectedEndDate?: Date
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

export type DatePickerMode = 'single' | 'multiple' | 'range'

export interface BaseDateProps {
  /**
   * Selection mode for the date picker.
   * single - single date selection
   * multiple - multiple date selection
   * range - range date selection
   *
   * @default single
   */
  datePickerMode?: DatePickerMode

  /**
   * Whether to show days from adjacent months to fill the weeks.
   * If true, days from the previous and next months will be displayed to fill the calendar grid.
   * @default true
   */
  showAdjacentMonthDays?: boolean

  /**
   * minimum selectable date inclusive.
   * Can be a string (in `outputDateFormat`) or a Date object.
   */
  minDate?: string | Date
  /**
   * maximum selectable date inclusive.
   * Can be a string (in `outputDateFormat`) or a Date object.
   */
  maxDate?: string | Date

  /**
   * Disable future dates
   */
  disableFutureDates?: boolean
  /**
   * Disable past dates
   */
  disablePastDates?: boolean

  /**
   * disable the given days of the week,
   * from 0 (Sunday) to 6 (Saturday).
   */
  disabledDaysOfWeek?: Array<number>

  /**
   * The format in which the date should be displayed inside the input value
   *
   * Checkout the dayjs docs for all available formats - https://day.js.org/docs/en/display/format
   * @default 'D MMM YYYY'
   */
  displayDateFormat?: string
  /**
   * The format in which the selected date should give output
   * And this format should be used whenever you are passing any date to this component
   *
   * Checkout the dayjs docs for all available formats - https://day.js.org/docs/en/display/format
   * @default 'DD-MM-YYYY'
   */
  outputDateFormat?: string
}

/**
 * Typed payload for Calendar onDateChange
 */
export type CalendarDateChange =
  | {
      mode: 'single'
      date?: Date
      displayDate: string
      outputDate: string
    }
  | {
      mode: 'multiple'
      dates: Date[]
      displayDate: string[]
      outputDate: string[]
    }
  | {
      mode: 'range'
      startDate?: Date
      endDate?: Date
      displayStartDate?: string
      displayEndDate?: string
      outputStartDate?: string
      outputEndDate?: string
    }

/**
 * Props for the Calendar component.
 */
export interface CalendarProps extends BaseUIProps, BaseDateProps {
  /**
   * The default selected date.
   * Can be a string (formatted date) or a Date object.
   */
  selectedDate?: string | Date

  /**
   * The default selected dates for `"multiple"` date selection mode.
   * Can be an array of strings (formatted dates) or Date objects.
   */
  selectedDates?: Array<string | Date>

  /**
   * The default selected end date for `"range"` date selection mode.
   * Can be a string (formatted date) or a Date object.
   */
  selectedEndDate?: string | Date

  /**
   * An array of disabled dates of string (in outputDateFormat) or a Date object.
   * Make sure to provide the outputDateFormat prop too if passing date as string
   */
  disableDates?: Array<string | Date>

  /**
   * Callback triggered when a date is selected. Receives a mode-aware, type-safe payload.
   */
  onDateChange?: (data: CalendarDateChange) => void
  /**
   * Props for configuring the year list (min and max year).
   */
  yearListProps?: Pick<YearListProps, 'minYear' | 'maxYear'>

  /**
   * The outer most container style for the calendar.
   * This can be used to set padding, margin, etc.
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * Base properties for a date picker component.
 */
export type BaseDatePickerProps = Omit<TextInputProps, 'value'> &
  Pick<
    CalendarProps,
    | 'displayDateFormat'
    | 'outputDateFormat'
    | 'disableDates'
    | 'disableFutureDates'
    | 'disablePastDates'
    | 'onDateChange'
  >

/**
 * Props for the DatePicker component.
 */
export interface DatePickerProps extends BaseDatePickerProps, BaseDateProps {
  /**
   * The default selected date.
   * Can be a string (formatted date) or a Date object.
   */
  defaultDate?: string | Date
  /**
   * Whether the date picker allows clearing the selected date.
   */
  clearable?: boolean

  /**
   * Separator string to display for the multiple and range modes.
   *
   * @default
   * ' to ' for "range" mode and ' ... ' for "multiple" mode
   */
  dateDisplayDelimiter?: string
}
