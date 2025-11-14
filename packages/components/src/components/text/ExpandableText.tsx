import React, {useState, useEffect, useCallback} from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native'

import {ExpandableTextProps} from '../types'

import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import View from '../view/View'
import Text from './Text'

/**
 * Expandable text component with Read more/less button
 */
function ExpandableText(props: ExpandableTextProps) {
  const {colors, isDark} = useBlossomTheme()

  const {
    numberOfLines = 3,
    showLabel = 'Read more',
    hideLabel = 'Read less',
    showLabelStyle,
    hideLabelStyle,
    ...rest
  } = useMergedProps('ExpandableText', props, {
    colors,
    isDark,
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [isTextClipped, setIsTextClipped] = useState(false)
  const [hasLayoutCompleted, setHasLayoutCompleted] = useState(false)

  const onTogglePress = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const handleTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      const {lines} = e.nativeEvent

      let minCharsInLine = Infinity
      let maxCharsInLine = -Infinity

      lines.forEach((line) => {
        const len = line.text?.length ?? 0
        if (len < minCharsInLine) minCharsInLine = len
        if (len > maxCharsInLine) maxCharsInLine = len
      })

      const diffCharsInLine = maxCharsInLine - minCharsInLine
      const lastLineChars = lines[lines.length - 1].text.length

      const isClipped =
        lines.length > numberOfLines ||
        (lines.length === numberOfLines &&
          lastLineChars + diffCharsInLine >= minCharsInLine)

      setIsTextClipped(isClipped)
      setHasLayoutCompleted(true)
    },
    [numberOfLines],
  )

  useEffect(() => {
    setHasLayoutCompleted(false)
  }, [rest?.children])

  return (
    <View style={styles.container}>
      <Text
        onTextLayout={!hasLayoutCompleted ? handleTextLayout : undefined}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        {...rest}
      />
      {isTextClipped && (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.6}
          style={styles.readMore}
          onPress={onTogglePress}>
          <Text
            status="info"
            typography="b2"
            style={isExpanded ? hideLabelStyle : showLabelStyle}>
            {isExpanded ? hideLabel : showLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ExpandableText

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  readMore: {
    marginTop: 2,
    alignSelf: 'baseline',
  },
})
