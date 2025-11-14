import {MonthDayItem} from '../types'
import {isBefore, isAfter} from '../utils'

/**
 * Helper function to determine if a date is disabled based on various criteria
 * @param param0 props related to disabling dates
 * @returns if the date is disabled
 */
export const getIsDateDisabled = ({
  item,
  disableFutureDates,
  disablePastDates,
  minDate,
  maxDate,
  disabledDaysOfWeek,
  disableDates,
  outputDateFormat,
}: {
  item: MonthDayItem
  disableFutureDates?: boolean
  disablePastDates?: boolean
  minDate?: Date | string
  maxDate?: Date | string
  disabledDaysOfWeek?: number[]
  disableDates?: MonthDayItem[]
  outputDateFormat?: string
}) => {
  const today = new Date()

  if (disableFutureDates) {
    const isFutureDate =
      item.year > today.getFullYear() ||
      (item.year === today.getFullYear() && item.month > today.getMonth()) ||
      (item.year === today.getFullYear() &&
        item.month === today.getMonth() &&
        item.day > today.getDate())

    if (isFutureDate) {
      return true
    }
  }

  if (disablePastDates) {
    const isPastDate =
      item.year < today.getFullYear() ||
      (item.year === today.getFullYear() && item.month < today.getMonth()) ||
      (item.year === today.getFullYear() &&
        item.month === today.getMonth() &&
        item.day < today.getDate())

    if (isPastDate) {
      return true
    }
  }

  if (minDate) {
    const isBeforeMinDate = isBefore({
      dmy: item,
      referenceDate: minDate,
      outputDateFormat,
    })
    if (isBeforeMinDate) return true
  }

  if (maxDate) {
    const isAfterMaxDate = isAfter({
      dmy: item,
      referenceDate: maxDate,
      outputDateFormat,
    })
    if (isAfterMaxDate) return true
  }

  if (disabledDaysOfWeek?.length) {
    const isDisabledDay =
      item.weekDay?.toString() && disabledDaysOfWeek.includes(item.weekDay)
    if (isDisabledDay) return true
  }

  const doesContainDay = disableDates?.find((value) => {
    return (
      item.day === value?.day &&
      item.month === value?.month &&
      item.year === value?.year
    )
  })

  return !!doesContainDay
}
