import {ReactNode} from 'react'
import {StyleProp, TextStyle, ViewStyle} from 'react-native'

export interface ActionSheetItem {
  /**
   * A unique key to identify the option. This will be passed to the `onItemPress` callback when the option is pressed.
   * It is important to ensure that each option has a unique key to avoid unexpected behavior.
   */
  key: string
  /**
   * Label to be displayed for the option in the ActionSheet.
   */
  label: string
  /**
   * Optional icon to be displayed alongside the option label on its left side
   */
  icon?: ReactNode
  /**
   * Whether the option is disabled or not.
   */
  disabled?: boolean
  /**
   * Whether the option is destructive or not.
   * If destructive is true, the option label will be styled with an error color to indicate that it performs a destructive action.
   */
  destructive?: boolean
  /**
   * Style for the option text
   */
  labelStyle?: StyleProp<TextStyle>
}

export interface ActionSheetViewProps {
  /**
   * Title to be displayed at the top of the ActionSheet
   */
  title?: string
  /**
   * Style for the title of the ActionSheet
   */
  titleStyle?: StyleProp<TextStyle>

  /**
   * Message to be displayed below the title of the ActionSheet
   */
  message?: string
  /**
   * Style for the message of the ActionSheet
   */
  messageStyle?: StyleProp<TextStyle>

  /**
   * Options to be displayed in the ActionSheet
   */
  options: ActionSheetItem[]

  /**
   * Style for the container of the ActionSheet
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * Whether to show a cancel button at the bottom of the ActionSheet
   */
  withCancelButton?: boolean
  /**
   * Label for the cancel button. If not provided, it will default to "Cancel".
   *
   * @default Cancel
   */
  cancelButtonLabel?: string
  /**
   * Style for the cancel button text
   */
  cancelButtonTextStyle?: StyleProp<TextStyle>

  /**
   * Action item style for each item in the ActionSheet
   */
  itemStyle?: StyleProp<ViewStyle>
  /**
   * Callback function for option press action
   *
   * @param key The key of the pressed option
   * @param index The index of the pressed option
   */
  onItemPress?: (key: string, index: number) => void
}

export interface ActionSheetOptions extends ActionSheetViewProps {
  /**
   * Callback function that is called when the ActionSheet is shown. This can be used to perform any setup or side effects when the ActionSheet becomes visible.
   */
  onShow?: () => void
  /**
   * Callback function that is called when the ActionSheet is dismissed. This can be used to perform any cleanup or side effects when the ActionSheet becomes not visible.
   */
  onHide?: () => void
}

export interface ActionSheetHandlerOptions {
  /**
   * Show an ActionSheet with the given options. If an ActionSheet is already visible, it will be replaced with the new one.
   */
  show: (options: ActionSheetOptions) => void
  /**
   * Hide the currently visible ActionSheet, if any. If there are multiple ActionSheets visible, it will hide the most recently shown one.
   */
  hide: () => void
}
