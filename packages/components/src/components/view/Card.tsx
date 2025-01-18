import React from 'react'
import {Platform, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {CardProps, ViewProps} from '../types'
import {useMergedProps} from '../../common'
import View from './View'

/**
 * Card view with elevation or shadow
 */
const CardView = (props: CardProps) => {
  const {colors, options, isDark} = useBlossomTheme()

  const {style, ...rest} = useMergedProps('Card', props, {colors, isDark})

  return (
    <View
      style={[
        styles.shadow,
        styles.border,
        {
          borderRadius: options?.borderRadius,
          shadowColor: colors.background300,
          borderColor: colors.background400,
        },
        Platform.select({
          web: {
            boxShadow: `1px 1px 1px 1px ${colors.background300}`,
          },
        }),
        style,
      ]}
      {...rest}
    />
  )
}

/**
 * Card Content with default padding to be used inside Card
 */
const CardContent = (props: ViewProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {style, ...rest} = useMergedProps('Card.Content', props, {
    colors,
    isDark,
  })

  return <View style={[styles.content, style]} {...rest} />
}

/**
 * Card component with it's content view
 */
const Card = Object.assign(CardView, {
  Content: CardContent,
})

export default Card

const styles = StyleSheet.create({
  border: {
    borderWidth: 0.2,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        borderWidth: 1,
        borderColor: 'red',
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
          width: 0.5,
          height: 0.5,
        },
      },
    }),
  },
  content: {
    padding: 10,
    backgroundColor: 'transparent',
  },
})
