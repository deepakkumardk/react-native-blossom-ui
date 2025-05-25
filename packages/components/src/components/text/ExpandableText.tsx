import React, {useState, useEffect, useCallback} from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native'

import {TextProps} from '../types'

import {useMergedProps} from '../../common'
import {useBlossomTheme} from '../../context'
import View from '../view/View'
import Text from './Text'

/**
 * Expandable text component with Read more/less button
 */
function ExpandableText(props: TextProps) {
  const {colors, isDark} = useBlossomTheme()

  const {numberOfLines = 3, ...rest} = useMergedProps('ExpandableText', props, {
    colors,
    isDark,
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [isTextClipped, setIsTextClipped] = useState(false)
  const [hasLayoutCompleted, setHasLayoutCompleted] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      const {lines} = e.nativeEvent
      const lastLineWidth = lines[lines.length - 1].width
      const maxWidthAvailable = Math.min(...lines.map((line) => line.width))

      const isClipped =
        lines.length > numberOfLines ||
        (lines.length === numberOfLines && lastLineWidth > maxWidthAvailable)
      setIsTextClipped(isClipped)
      setHasLayoutCompleted(true)
    },
    [numberOfLines],
  )

  useEffect(() => {
    setHasLayoutCompleted(false)
  }, [rest?.children])

  return (
    <View>
      <Text
        onTextLayout={!hasLayoutCompleted ? handleTextLayout : undefined}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        ellipsizeMode="tail"
        {...rest}
      />
      {isTextClipped && (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.4}
          style={styles.readMore}
          onPress={toggleExpanded}>
          <Text status="primary" typography="b3">
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ExpandableText

const styles = StyleSheet.create({
  readMore: {
    marginTop: 4,
  },
})
