import React from 'react'
import {ScrollView, ScrollViewProps, StyleSheet} from 'react-native'
import {Surface} from '@react-native-blossom-ui/components'

const AppScrollView = ({...rest}: ScrollViewProps) => {
  return (
    <Surface style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        {...rest}
        contentContainerStyle={[styles.scrollView, rest?.contentContainerStyle]}
      />
    </Surface>
  )
}

export default AppScrollView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
    paddingBottom: 100,
  },
})
