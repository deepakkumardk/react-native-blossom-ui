import {overlayBridge} from './overlayBridge'
import {OverlayActions, OverlayNode} from './types'

export const Overlay: OverlayActions = {
  show(node: Omit<OverlayNode, 'id'>) {
    if (!overlayBridge.controller) {
      console.warn('OverlayProvider is not mounted.')
      return ''
    }

    return overlayBridge.controller.show(node)
  },

  update(id: string, updatedNode: Partial<Omit<OverlayNode, 'id'>>) {
    if (!overlayBridge.controller) {
      console.warn('OverlayProvider is not mounted.')
      return
    }

    overlayBridge.controller.update(id, updatedNode)
  },

  dismiss(id: string) {
    if (!overlayBridge.controller) {
      console.warn('OverlayProvider is not mounted.')
      return
    }

    overlayBridge.controller.dismiss(id)
  },

  dismissLast() {
    if (!overlayBridge.controller) {
      console.warn('OverlayProvider is not mounted.')
      return
    }

    overlayBridge.controller.dismissLast()
  },

  dismissAll() {
    if (!overlayBridge.controller) {
      console.warn('OverlayProvider is not mounted.')
      return
    }

    overlayBridge.controller.dismissAll()
  },
}
