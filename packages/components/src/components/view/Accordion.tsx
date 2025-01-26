import React, {useEffect, useState} from 'react'
import {Pressable, StyleSheet} from 'react-native'

import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'
import View from './View'
import {AccordionProps} from '../types'
import {Icon} from '../icon'
import {Text} from '../text'
import Spacer from './Spacer'

/**
 * Collapsed components with auto open and close
 */
const Accordion = (props: AccordionProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    isCollapsed,
    title,
    subtitle,
    description,
    left,
    right,
    children,
    containerStyle,
    onPress,
  } = useMergedProps('Accordion', props, {colors, isDark})

  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    setIsSelected(!!isCollapsed)
  }, [isCollapsed])

  return (
    <View style={containerStyle}>
      <Pressable
        accessibilityRole="button"
        style={[styles.titleRow]}
        onPress={() => {
          setIsSelected((prev) => !prev)
          onPress?.()
        }}>
        {left}
        <View style={[styles.titleColumn, !left && styles.titleLeft]}>
          {typeof title === 'string' ? (
            <Text typography="b1">{title}</Text>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <Text typography="l2" style={{color: colors.text400}}>
              {subtitle}
            </Text>
          ) : (
            subtitle
          )}
        </View>
        {right}
        <Icon
          name={isSelected ? 'chevron-up' : 'chevron-down'}
          color={colors.text200}
        />
      </Pressable>

      {isSelected ? (
        <View>
          <Spacer />
          {typeof description === 'string' ? (
            <Text>{description}</Text>
          ) : (
            children
          )}
        </View>
      ) : null}
    </View>
  )
}

export default Accordion

const styles = StyleSheet.create({
  titleColumn: {
    flex: 1,
    marginHorizontal: 12,
  },
  titleLeft: {
    marginStart: 0,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
})
