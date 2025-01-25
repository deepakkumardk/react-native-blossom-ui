import React, {useEffect, useState} from 'react'
import {
  Avatar,
  Button,
  ShimmerView,
  View,
} from '@react-native-blossom-ui/components'

export function ShimmerViewUsage() {
  return (
    <View>
      <ShimmerView height={140} borderRadius={20} />
      <View row>
        <ShimmerView circular height={60} />
        <View style={{marginStart: 20, alignSelf: 'center'}}>
          <ShimmerView width={200} />
          <ShimmerView width={100} />
        </View>
      </View>
    </View>
  )
}

export function ShimmerViewCircular() {
  return (
    <View row>
      <ShimmerView circular height={40} />
      <ShimmerView
        circular
        height={40}
        color="gold"
        style={{marginHorizontal: 20}}
      />
    </View>
  )
}

export function ShimmerViewDuration() {
  return (
    <View>
      <ShimmerView height={40} duration={400} />
    </View>
  )
}

export function ShimmerViewStopAnimation() {
  return (
    <View>
      <ShimmerView height={40} animated={false} />
    </View>
  )
}

export function ShimmerViewVisibility() {
  const [isLoading, setIsLoading] = useState(true)

  const onReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  useEffect(onReset, [])

  return (
    <View style={{alignSelf: 'center'}}>
      <ShimmerView visible={isLoading} circular height={100}>
        <Avatar
          mode="circle"
          size={100}
          url="https://picsum.photos/200/300?random=1"
          style={{marginVertical: 8}}
        />
      </ShimmerView>
      <Button title="Reset" size="small" onPress={onReset} />
    </View>
  )
}
