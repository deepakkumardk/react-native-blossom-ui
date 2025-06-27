import React, {useEffect, useState} from 'react'

import Popover from './Popover'
import {TooltipProps} from '../types'
import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import {Text} from '../text'

/**
 * Tooltip component made from Popover with basic styling
 */
const Tooltip = (props: TooltipProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {visible, title, titleStyle, ...rest} = useMergedProps(
    'Tooltip',
    props,
    {colors, isDark},
  )

  const [showPopover, setShowPopover] = useState(visible)

  useEffect(() => {
    setShowPopover(visible)
  }, [visible])

  return (
    <Popover
      visible={showPopover}
      contentStyle={{
        backgroundColor: colors.background900,
      }}
      wrapContent
      // offset={rest.position === 'top' ? 24 : 0}
      onBackdropPress={() => setShowPopover(false)}
      {...rest}>
      <Text style={[{color: colors.text900}, titleStyle]}>{title}</Text>
    </Popover>
  )
}

export default Tooltip
