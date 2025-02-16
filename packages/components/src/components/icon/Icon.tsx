/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import {TouchableOpacity} from 'react-native'

import {IconProps} from '../types'
import {getStatusColorName} from '../utils'
import {useBlossomTheme} from '../../context'
import {useMergedProps} from '../../common'

/**
 * Icon component for vector Icons defaulted to Ionicons
 */
const Icon = (props: IconProps) => {
  const {colors, isDark} = useBlossomTheme()

  const {
    status,
    size = 24,
    family = 'Ionicons',
    ...rest
  } = useMergedProps('Icon', props, {colors, isDark})

  const IconComponent = getIconFamily(family)

  return rest?.onPress ? (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.5}
      disabled={rest?.disabled}
      onPress={rest?.onPress}>
      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment //
      @ts-expect-error */}
      <IconComponent
        color={colors[getStatusColorName(status, isDark)]}
        size={size}
        {...rest}
        onPress={undefined}
      />
    </TouchableOpacity>
  ) : (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <IconComponent
      color={colors[getStatusColorName(status, isDark)]}
      size={size}
      {...rest}
    />
  )
}

export default Icon

const getIconFamily = (family: IconProps['family'] = 'Ionicons') => {
  const familyMap: Record<typeof family, unknown> = {
    AntDesign: require('react-native-vector-icons/AntDesign').default,
    Entypo: require('react-native-vector-icons/Entypo').default,
    EvilIcons: require('react-native-vector-icons/EvilIcons').default,
    Feather: require('react-native-vector-icons/Feather').default,
    FontAwesome: require('react-native-vector-icons/FontAwesome').default,
    FontAwesome5: require('react-native-vector-icons/FontAwesome5').default,
    Fontisto: require('react-native-vector-icons/Fontisto').default,
    Foundation: require('react-native-vector-icons/Foundation').default,
    Ionicons: require('react-native-vector-icons/Ionicons').default,
    MaterialCommunityIcons:
      require('react-native-vector-icons/MaterialCommunityIcons').default,
    MaterialIcons: require('react-native-vector-icons/MaterialIcons').default,
    Octicons: require('react-native-vector-icons/Octicons').default,
    SimpleLineIcons: require('react-native-vector-icons/SimpleLineIcons')
      .default,
    Zocial: require('react-native-vector-icons/Zocial').default,
  }
  return familyMap[family]
}
