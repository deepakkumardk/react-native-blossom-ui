import {useContext} from 'react'
import {OverlayContext} from './OverlayContext'
import {OverlayNode, UseOverlayReturn} from '../../types'

export const useOverlay = (): UseOverlayReturn => {
  const manager = useContext(OverlayContext)

  if (!manager) {
    throw new Error('useOverlay must be used within <OverlayProvider>')
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
