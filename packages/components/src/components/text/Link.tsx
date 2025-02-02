import React from 'react'
import {Linking} from 'react-native'

import {LinkProps} from '../types'
import View from '../view/View'
import Text from './Text'
import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'

const SPACE = ' '
/**
 * Link text with href and left/right text support
 */
const Link = (props: LinkProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    leftText,
    rightText,
    title = '',
    style,
    href = '',
    ...rest
  } = useMergedProps('Link', props, {
    colors,
    isDark,
  })

  const onTextPress = async () => {
    try {
      const canOpen = await Linking.canOpenURL(href)
      if (canOpen) await Linking.openURL(href)
    } catch (error) {
      // Error Handling
    }
  }

  return (
    <View row>
      {typeof leftText === 'string' ? (
        <Text>
          {leftText}
          {SPACE}
        </Text>
      ) : (
        leftText
      )}
      <Text
        onPress={onTextPress}
        {...rest}
        style={[
          {
            color: colors.info500,
          },
          style,
        ]}>
        {title}
      </Text>
      {typeof rightText === 'string' ? (
        <Text>
          {SPACE}
          {rightText}
        </Text>
      ) : (
        rightText
      )}
    </View>
  )
}

export default Link
