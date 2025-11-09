import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {MonthDayItem} from '../types'

dayjs.extend(customParseFormat)

/**
 *
 * @param month current month for which you want your days list
 * @param year current year for which you want your days list
 * @returns list of days along with prev & next appended days
 */
export const getAppendedDaysListForMonth = (month: number, year: number) => {
  const date = getDateWithDMY(1, month, year)
  const totalDays = getDaysInMonth(month, year)
  const lastDate = getDateWithDMY(totalDays, month, year)

  const currentMonthDays = getDaysListForMonth(month, year)

  const startDayOfMonth = dayjs(date).day()
  const endDayOfMonth = dayjs(lastDate).day()

  const lastMonthDate = getDateWithDMY(
    1,
    month - 1,
    // month === 0 ? year - 1 : year,
    year,
  )
  const lastMonthDays = getDaysListForMonth(
    month - 1,
    month === 0 ? year - 1 : year,
  )
  const nextMonthDate = getDateWithDMY(
    1,
    month + 1,
    // month === 11 ? year + 1 : year,
    year,
  )
  const nextMonthDays = getDaysListForMonth(
    month + 1,
    month === 11 ? year + 1 : year,
  )

  const appendedDays: MonthDayItem[] = [
    ...lastMonthDays
      .slice(-startDayOfMonth, startDayOfMonth === 0 ? 0 : undefined)
      .map((value, index, array) => ({
        day: value,
        month: lastMonthDate.getMonth(),
        year: lastMonthDate.getFullYear(),
        weekDay: (startDayOfMonth - array.length + index) % 7,
        isCurrentMonth: false,
      })),
    ...currentMonthDays.map((value, index) => ({
      day: value,
      month: date.getMonth(),
      year: date.getFullYear(),
      weekDay:
        startDayOfMonth + index < 7
          ? startDayOfMonth + index
          : (startDayOfMonth + index) % 7,
      isCurrentMonth: true,
    })),
    ...nextMonthDays.slice(0, 6 - endDayOfMonth).map((value, index) => ({
      day: value,
      month: nextMonthDate.getMonth(),
      year: nextMonthDate.getFullYear(),
      weekDay:
        endDayOfMonth + 1 + index < 7
          ? endDayOfMonth + 1 + index
          : (endDayOfMonth + 1 + index) % 7,
      isCurrentMonth: false,
    })),
  ]
  return appendedDays
}

export const getDaysListForMonth = (month: number, year: number) => {
  const totalDays = getDaysInMonth(month, year)
  const daysList = Array(totalDays)
    .fill(0)
    .map((_, i) => i + 1)

  return daysList
}

export const getDaysInMonth = (month: number, year: number) => {
  const date = new Date()
  date.setFullYear(year, month, 1)
  const totalDays = dayjs(date).daysInMonth()

  return totalDays
}

export const getDateWithDMYItem = ({day, month, year}: MonthDayItem) => {
  const date = new Date()
  date.setFullYear(year, month, day)
  return date
}

export const getDateWithDMY = (day: number, month: number, year: number) => {
  const date = new Date()
  date.setFullYear(year, month, day)
  return date
}

export const getDayjsWithDMY = ({day, month, year}: MonthDayItem) => {
  const date = new Date()
  date.setFullYear(year, month, day)
  return dayjs(date)
}

export const convertToDayjs = (date?: Date | string, format?: string) =>
  date instanceof Date ? dayjs(date) : dayjs(date, format)

export const toDate = (date?: string, format?: string) =>
  date ? dayjs(date, format).toDate() : undefined

export const getFormattedDate = (date: Date, format = 'dd mmm yyyy') =>
  dayjs(date).format(format)

export const isBefore = ({
  dmy,
  minDate,
  outputDateFormat,
}: {
  dmy: MonthDayItem
  minDate?: Date | string
  outputDateFormat?: string
}) => {
  if (!minDate) return false
  const minDayjs = convertToDayjs(minDate, outputDateFormat)

  return getDayjsWithDMY(dmy).isBefore(minDayjs, 'date')
}

export const isAfter = ({
  dmy,
  maxDate,
  outputDateFormat,
}: {
  dmy: MonthDayItem
  maxDate?: Date | string
  outputDateFormat?: string
}) => {
  if (!maxDate) return false
  const maxDayjs = convertToDayjs(maxDate, outputDateFormat)

  return getDayjsWithDMY(dmy).isAfter(maxDayjs, 'date')
}

// -------- Year Utils ---------

/**
 * Returns the next yearsCount
 */
export const getYearsList = ({
  currentYear,
  yearsCount = 12,
  minYear,
  maxYear,
}: {
  currentYear: number
  yearsCount?: number
  minYear?: number
  maxYear?: number
}) => {
  const years = Array(yearsCount)
    .fill(currentYear)
    .map((value: number, index) => value + index)
    .filter((value) => {
      if (minYear && maxYear) {
        return value >= minYear && value <= maxYear
      }
      if (minYear) {
        return value >= minYear
      }
      if (maxYear) {
        return value <= maxYear
      }
      return true
    })

  return years
}

/**
 * Returns the next yearsCount
 */
export const getYearsListForSelect = ({
  minYear,
  maxYear,
}: {
  minYear?: number
  maxYear?: number
}) => {
  const currentYear = new Date().getFullYear()
  const yearsAppended = 20
  const firstYear = minYear || currentYear - yearsAppended
  const lastYear = maxYear || currentYear + yearsAppended

  const years = [firstYear]
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= lastYear - firstYear; i++) {
    years.push(firstYear + i)
  }

  return years
}
