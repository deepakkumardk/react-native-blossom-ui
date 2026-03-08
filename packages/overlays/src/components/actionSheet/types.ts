import {ReactNode} from 'react'
import {StyleProp, TextStyle, ViewStyle} from 'react-native'

export interface ActionSheetItem {
  key: string
  label: string
  icon?: ReactNode
  disabled?: boolean
  destructive?: boolean
  textStyle?: StyleProp<TextStyle>
}

export interface ActionSheetViewProps {
  title?: string
  titleStyle?: StyleProp<TextStyle>

  message?: string
  messageStyle?: StyleProp<TextStyle>

  options: ActionSheetItem[]

  containerStyle?: StyleProp<ViewStyle>

  withCancelButton?: boolean
  cancelButtonLabel?: string
  cancelButtonTextStyle?: StyleProp<TextStyle>

  itemStyle?: StyleProp<ViewStyle>
  onItemPress?: (key: string, index: number) => void
}

export interface ActionSheetOptions extends ActionSheetViewProps {
  onShow?: () => void
  onHide?: () => void
}

export interface ActionSheetHandlerOptions {
  show: (options: ActionSheetOptions) => void
  hide: () => void
}
