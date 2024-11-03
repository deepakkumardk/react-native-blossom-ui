import {useEffect, useState} from 'react'

/**
 * Debounce hook for inputs
 */
export const useDebouncedValue = (value: string, delay = 250) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}
