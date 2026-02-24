import {OverlayNode, OverlayType} from '../types'

const overlayTypeAndBehaviorMap: Record<
  OverlayType,
  Pick<OverlayNode, 'backdropBehavior' | 'dismissOnBackPress'>
> = {
  dialog: {
    backdropBehavior: 'block',
    dismissOnBackPress: true,
  },
  menu: {
    backdropBehavior: 'interactive',
    dismissOnBackPress: false,
  },
  modal: {
    backdropBehavior: 'block',
    dismissOnBackPress: true,
  },
  popover: {
    backdropBehavior: 'interactive',
    dismissOnBackPress: false,
  },
  sheet: {
    backdropBehavior: 'block',
    dismissOnBackPress: true,
  },
  toast: {
    backdropBehavior: 'interactive',
    dismissOnBackPress: false,
  },
  tooltip: {
    backdropBehavior: 'interactive',
    dismissOnBackPress: false,
  },
  snackbar: {
    backdropBehavior: 'interactive',
    dismissOnBackPress: false,
  },
  spotlight: {
    backdropBehavior: 'interactive',
    dismissOnBackPress: false,
  },
}

export function getOverlayBehaviorProps(type: OverlayType) {
  return overlayTypeAndBehaviorMap[type]
}
