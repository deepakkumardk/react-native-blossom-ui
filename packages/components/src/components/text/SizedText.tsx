import React from 'react'

import {SizedTextProps} from '../types'
import Text from './Text'
import {TypographyOptions} from '../../common'

/**
 * Text component to be used for label, caption & Error
 */
const SizedText = (props: SizedTextProps) => {
  const {mode = 'label', size = 'medium', ...rest} = props

  return (
    <Text typography={sizeMap[size][mode] as TypographyOptions} {...rest} />
  )
}

export default SizedText

const sizeMap = {
  small: {
    label: 'c1',
    caption: 'c2',
    body: 'l2',
  },
  medium: {
    label: 'l2',
    caption: 'c1',
    body: 'b2',
  },
  large: {
    label: 'b3',
    caption: 'l2',
    body: 's2',
  },
}
