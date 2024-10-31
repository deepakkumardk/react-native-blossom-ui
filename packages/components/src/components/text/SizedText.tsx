import React, {useCallback} from 'react'

import {BlossomSize, SizedTextProps, TypographyOptions} from '../types'
import Text from './Text'

/**
 * Text component to be used for label, caption & Error
 */
const SizedText = (props: SizedTextProps) => {
  const {mode = 'label', size = 'medium', ...rest} = props

  const getTypography = useCallback((): TypographyOptions => {
    const sizeMap: Record<
      BlossomSize,
      Record<typeof mode, TypographyOptions>
    > = {
      small: {
        label: 'c1',
        caption: 'c2',
      },
      medium: {
        label: 'l2',
        caption: 'c1',
      },
      large: {
        label: 'b3',
        caption: 'l2',
      },
    }

    return sizeMap[size][mode]
  }, [mode, size])

  return <Text typography={getTypography()} {...rest} />
}

export default SizedText
