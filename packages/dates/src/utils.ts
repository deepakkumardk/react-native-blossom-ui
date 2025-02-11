import dayjs from 'dayjs'

export const getAppendedDaysListForMonth = (month: number, year: number) => {
  const date = getDateWithDMY(1, month, year)
  const totalDays = getDaysInMonth(month, year)

  const currentMonthDays = getDaysListForMonth(month, year)
  const lastDate = getDateWithDMY(totalDays, month, year)

  const startDayOfMonth = dayjs(date).day()
  const endDayOfMonth = dayjs(lastDate).day()

  const lastMonthDate = getDateWithDMY(
    1,
    month - 1,
    month === 0 ? year - 1 : year,
  )
  const lastMonthDays = getDaysListForMonth(
    month - 1,
    month === 0 ? year - 1 : year,
  )
  const nextMonthDate = getDateWithDMY(
    1,
    month + 1,
    month === 11 ? year + 1 : year,
  )
  const nextMonthDays = getDaysListForMonth(
    month + 1,
    month === 11 ? year + 1 : year,
  )

  const appendedDays = [
    ...lastMonthDays
      .slice(-startDayOfMonth, startDayOfMonth === 0 ? 0 : undefined)
      .map((value) => ({
        day: value,
        month: lastMonthDate.getMonth(),
        year: lastMonthDate.getFullYear(),
        isCurrentMonth: false,
      })),
    ...currentMonthDays.map((value) => ({
      day: value,
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth: true,
    })),
    ...nextMonthDays.slice(0, 6 - endDayOfMonth).map((value) => ({
      day: value,
      month: nextMonthDate.getMonth(),
      year: nextMonthDate.getFullYear(),
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

export const getDateWithDMY = (day: number, month: number, year: number) => {
  const date = new Date()
  date.setFullYear(year, month, day)
  return date
}

export const getFormattedDate = (date: Date, format = 'dd mmm yyyy') =>
  dayjs(date).format(format)
