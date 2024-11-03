import deepmerge from 'deepmerge'
import {useMemo} from 'react'

let defaultProps: object = {}

export const ComponentManager = {
  setDefaultProps: (props: object) => {
    defaultProps = {
      ...defaultProps,
      ...props,
    }
  },
}

export const useMergedProps = <T>(name: string, props: T): T => {
  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return deepmerge(defaultProps[name], props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, props])
}
