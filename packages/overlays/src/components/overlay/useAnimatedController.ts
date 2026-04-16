import {useEffect, useRef, useState} from 'react'
import {Animated, Easing} from 'react-native'
import {AnimationPhase, OverlayAnimationConfig} from './types'

export function useAnimatedController(
  visible: boolean,
  animationConfig?: OverlayAnimationConfig,
) {
  const animatedValue = useRef(new Animated.Value(0)).current

  const [phase, setPhase] = useState<AnimationPhase>(
    visible ? 'entered' : 'exited',
  )

  useEffect(() => {
    let animation: Animated.CompositeAnimation

    if (visible) {
      setPhase('entering')

      const enterDriver = animationConfig?.enter ?? defaultEnter
      animation = enterDriver(animatedValue)

      animation.start(() => {
        setPhase('entered')
      })
    } else {
      setPhase('exiting')

      const exitDriver = animationConfig?.exit ?? defaultExit
      animation = exitDriver(animatedValue)

      animation.start(() => {
        setPhase('exited')
      })
    }

    return () => animation?.stop()
  }, [visible, animationConfig, animatedValue])

  return {animatedValue, phase}
}

const defaultEnter = (value: Animated.Value) =>
  Animated.timing(value, {
    toValue: 1,
    duration: 200,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  })

const defaultExit = (value: Animated.Value) =>
  Animated.timing(value, {
    toValue: 0,
    duration: 200,
    easing: Easing.in(Easing.cubic),
    useNativeDriver: true,
  })
