import {StyleProp, TextStyle, ViewStyle} from 'react-native'

export type SnackbarTheme = 'light' | 'dark' | 'auto'

export interface SnackbarViewProps {
  text: string
  textStyle?: StyleProp<TextStyle>
  numberOfLines?: number

  theme?: SnackbarTheme

  actionText?: string
  actionTextStyle?: StyleProp<TextStyle>
  onActionPress?: () => void

  containerStyle?: StyleProp<ViewStyle>
}

export interface SnackbarOptions extends SnackbarViewProps {
  offset?: number
  duration?: number
  position?: 'top' | 'bottom'
  theme?: SnackbarTheme

  onShow?: () => void
  onHide?: () => void
}

export interface SnackbarHandlerOptions {
  show: (options: SnackbarOptions) => void
  hide: () => void
}
