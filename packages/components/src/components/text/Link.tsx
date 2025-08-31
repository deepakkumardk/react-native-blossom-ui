import React, {useCallback} from 'react'
import {Linking, StyleSheet, TouchableOpacity} from 'react-native'

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
    containerStyle,
    href = '',
    onLinkOpenError,
    ...rest
  } = useMergedProps('Link', props, {
    colors,
    isDark,
  })

  const onTextPress = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(href)
      if (canOpen) await Linking.openURL(href)
    } catch (error) {
      // Error Handling
      onLinkOpenError?.(error)
    }
  }, [href, onLinkOpenError])

  return (
    <View row style={containerStyle}>
      {typeof leftText === 'string' ? (
        <Text>
          {leftText}
          {SPACE}
        </Text>
      ) : (
        leftText
      )}
      <TouchableOpacity
        accessibilityRole="link"
        activeOpacity={0.5}
        onPress={onTextPress}>
        <Text
          {...rest}
          style={[
            {
              color: colors.info500,
            },
            styles.link,
            style,
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
})
