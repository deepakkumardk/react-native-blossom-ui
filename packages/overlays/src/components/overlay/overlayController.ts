import {
  Listener,
  OverlayControllerProps,
  OverlayNode,
  OverlayUpdate,
} from './types'

export function createOverlayController(): OverlayControllerProps {
  let overlays: OverlayNode[] = []
  const listeners = new Set<Listener>()

  const emit = () => {
    listeners.forEach((listener) => listener())
  }

  const getIndex = (id: string) => {
    return overlays.findIndex((item) => item.id === id)
  }

  return {
    subscribe(listener: Listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },

    getState() {
      return [...overlays]
    },

    has(id: string) {
      return getIndex(id) !== -1
    },

    show(node: Omit<OverlayNode, 'id'>) {
      const id = Math.random().toString(36).substring(2, 9)
      const nodeWithId = {...node, id, visible: true} as OverlayNode

      overlays = [...overlays, nodeWithId]
      emit()
      return id
    },

    update(id: string, updatedNode: OverlayUpdate) {
      const index = getIndex(id)
      if (index === -1) return

      const next = [...overlays]
      next[index] = {
        ...next[index],
        ...updatedNode,
      }

      overlays = next
      emit()
    },

    dismiss(id: string) {
      const index = getIndex(id)
      if (index === -1) return

      const next = [...overlays]

      next[index] = {
        ...next[index],
        visible: false,
      }

      overlays = next
      emit()
    },

    remove(id: string) {
      overlays = overlays.filter((item) => item.id !== id)
      emit()
    },

    dismissLast(type?: OverlayNode['type']) {
      if (overlays.length === 0) return

      let last = overlays[overlays.length - 1]
      if (type && last.type !== type) {
        const lastOfType = [...overlays]
          .reverse()
          .find((item) => item.type === type)
        if (!lastOfType) return
        last = lastOfType
      }

      this.update(last.id, {visible: false})
    },

    dismissScope(scope: string) {
      overlays = overlays.map((item) =>
        item.scope === scope ? {...item, visible: false} : item,
      )

      emit()
    },

    dismissAll() {
      if (!overlays.length) return
      overlays = overlays.map((item) => ({...item, visible: false}))
      emit()
    },
  }
}
