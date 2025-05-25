import {useMemo} from 'react'

import {ComponentPropsObjectMap, ThemeValues} from './types'
import {ComponentPropsMap} from '../components/types'
import {safeDeepMerge} from './deepMerge'

let defaultProps: ComponentPropsObjectMap<ComponentPropsMap> = {}

let isDeepMergeEnabled = false

export const ComponentManager = {
  /**
   * Set & customize the default props conditionally
   * @param props named object mapping functions for each component
   */
  setDefaultProps(props: ComponentPropsObjectMap<ComponentPropsMap>) {
    defaultProps = {
      ...defaultProps,
      ...props,
    }
  },

  enableDeepMerge(nextState: boolean) {
    isDeepMergeEnabled = !!nextState
  },
}

export const useMergedProps = <T>(
  name: string,
  props: T,
  theme: ThemeValues,
): T => {
  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const initialProps = defaultProps?.[name]?.(props, theme)

    if (isDeepMergeEnabled) {
      return safeDeepMerge<T>(initialProps, props)
    }
    return {
      ...initialProps,
      ...props,
    } as T
  }, [name, props, theme])
}
