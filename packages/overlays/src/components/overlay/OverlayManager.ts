import {
  Listener,
  OverlayManagerProps,
  OverlayNode,
  OverlayUpdate,
} from '../../types'

export function createOverlayManager(): OverlayManagerProps {
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

    show(node: OverlayNode) {
      overlays = [...overlays, node]
      emit()
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
      const next = overlays.filter((item) => item.id !== id)
      if (next.length === overlays.length) return

      overlays = next
      emit()
    },

    dismissLast() {
      if (overlays.length === 0) return

      const last = overlays[overlays.length - 1]
      overlays = overlays.filter((item) => item.id !== last.id)
      emit()
    },

    dismissAll() {
      if (!overlays.length) return
      overlays = []
      emit()
    },
  }
}
