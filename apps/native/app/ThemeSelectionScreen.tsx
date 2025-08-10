import React from 'react'
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'

import {
  View,
  Text,
  Divider,
  Icon,
  Surface,
} from '@react-native-blossom-ui/components'
import {themes, useAppTheme} from '../context/ThemeSelectionContext'

/**
 * This screen allows you to select and see how different themes look in the app .
 */
export default function ThemeSelectionScreen() {
  const {themeSelectionType, setThemeSelectionType, isDark} = useAppTheme()

  const themeList = Object.entries(themes)
    .filter(([key]) => key !== 'default')
    .map(([key, value]) => ({
      key,
      title: `${key.charAt(0).toUpperCase() + key.slice(1)}`,
      primary: isDark ? value.dark.primary500 : value.light.primary500,
      accent: isDark ? value.dark.accent500 : value.light.accent500,
      background: isDark ? value.dark.background100 : value.light.background100,
    }))

  return (
    <Surface style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text status="accent" style={styles.text}>
            Themes
          </Text>
          <Text status="accent" style={styles.textRight}>
            Color
          </Text>
        </View>
      </View>
      <Divider style={{marginBottom: 20}} />
      <ScrollView>
        {themeList.map((item) => {
          const isSelected = item.key === themeSelectionType

          return (
            <View key={item.key}>
              <TouchableOpacity
                onPress={() => setThemeSelectionType(item.key)}
                activeOpacity={0.6}
                accessibilityRole="button"
                style={[
                  {backgroundColor: item.background},
                  isSelected && {opacity: 1},
                ]}>
                {isSelected && (
                  <Icon
                    family="Ionicons"
                    name="checkmark-circle-sharp"
                    status="success"
                    style={[
                      styles.iconCheckmark,
                      {backgroundColor: item.background},
                    ]}
                  />
                )}
                <View style={[styles.item]}>
                  <View style={[styles.itemTextContainer]}>
                    <Text numberOfLines={1}>{item.title}</Text>
                  </View>

                  <View style={[styles.itemRight]}>
                    <View
                      style={[
                        styles.rightColor,
                        {backgroundColor: item.primary},
                      ]}
                    />
                    <View
                      style={[
                        styles.rightColor,
                        {backgroundColor: item.accent},
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          )
        })}
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
  },
  textRight: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 18,
    left: 2,
  },

  itemTextContainer: {
    flex: 1,
    left: 6,
    flexDirection: 'row',
  },
  iconCheckmark: {
    position: 'absolute',
    top: 18,
  },
  itemRight: {
    flex: 1,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightColor: {
    borderRadius: 100,
    width: 25,
    height: 25,
  },
})
