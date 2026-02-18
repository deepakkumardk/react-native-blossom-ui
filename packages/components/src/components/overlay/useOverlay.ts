import {useContext} from 'react'
import {OverlayContext} from './OverlayContext'
import {OverlayNode} from '../types'

export type UseOverlayReturn = {
  show: (config: Omit<OverlayNode, 'id'>) => string
  update: (id: string, updatedNode: Partial<Omit<OverlayNode, 'id'>>) => void
  dismiss: (id: string) => void
  dismissLast: () => void
  dismissAll: () => void
}

export const useOverlay = (): UseOverlayReturn => {
  const manager = useContext(OverlayContext)

  if (!manager) {
    throw new Error(
      'useOverlay must be used within <OverlayContextProvider> (or <BlossomProvider>)',
    )
  }

  const show = (config: Omit<OverlayNode, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)

    manager.show({
      ...config,
      id,
    })

    return id
  }

  const update = (
    id: string,
    updatedNode: Partial<Omit<OverlayNode, 'id'>>,
  ) => {
    manager.update(id, updatedNode)
  }

  const dismiss = (id: string) => {
    manager.dismiss(id)
  }

  const dismissLast = () => {
    manager.dismissLast()
  }

  const dismissAll = () => {
    manager.dismissAll()
  }

  return {
    show,
    update,
    dismiss,
    dismissLast,
    dismissAll,
  }
}
