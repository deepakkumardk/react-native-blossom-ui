import DialogAlert from './DialogAlert'
import {Dialog as ComposedDialog} from './composed'

export const Dialog = {
  ...ComposedDialog,

  Alert: DialogAlert,
}
