import {
  AvatarProps,
  BlossomSize,
  BlossomStatus,
  ButtonMode,
  TypographyOptions,
} from '@react-native-blossom-ui/components'

export const TYPOGRAPHY_LIST: TypographyOptions[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  's1',
  's2',
  's3',
  'b1',
  'b2',
  'b3',
  'l1',
  'l2',
  'l3',
  'c1',
  'c2',
  'c3',
]

export const STATUS_LIST: BlossomStatus[] = [
  'primary',
  'accent',
  'success',
  'info',
  'warning',
  'error',
]

export const SIZE_LIST: BlossomSize[] = ['small', 'medium', 'large']

export const BUTTON_MODES: ButtonMode[] = [
  'filled',
  'tinted',
  'outlined',
  'plain',
]

export const AVATAR_MODES: AvatarProps['mode'][] = ['circle', 'round', 'square']
