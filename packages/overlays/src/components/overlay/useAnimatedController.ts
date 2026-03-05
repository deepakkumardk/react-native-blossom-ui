import {useRef, useState, useEffect} from 'react'
import {Animated, Easing} from 'react-native'
import {AnimationConfig, AnimationPhase} from './types'

export function useAnimatedController(
  visible: boolean,
  config?: AnimationConfig,
) {
  const animatedValue = useRef(new Animated.Value(0)).current
  const [phase, setPhase] = useState<AnimationPhase>(
    visible ? 'entered' : 'exited',
  )

  useEffect(() => {
    const toValue = visible ? 1 : 0
    const nextPhase = visible ? 'entering' : 'exiting'

    setPhase(nextPhase)

    config?.onAnimationStart?.()

    const animationType = config?.type ?? 'timing'

    const defaultConfig = {
      toValue,
      useNativeDriver: config?.useNativeDriver ?? true,
    }
    const animation =
      animationType === 'spring'
        ? Animated.spring(animatedValue, defaultConfig)
        : animationType === 'decay'
          ? Animated.decay(animatedValue, {
              ...defaultConfig,
              velocity: toValue,
            })
          : Animated.timing(animatedValue, {
              ...defaultConfig,
              duration: config?.duration ?? 200,
              easing: config?.easing ?? Easing.out(Easing.ease),
            })

    animation.start(({finished}) => {
      if (!finished) {
        config?.onAnimationEnd?.(finished)
        return
      }

      const finalPhase = visible ? 'entered' : 'exited'
      setPhase(finalPhase)

      config?.onAnimationEnd?.(finished)
    })

    return () => {
      animation.stop()
    }
  }, [animatedValue, visible, config])

  return {
    animatedValue,
    phase,
  }
}
