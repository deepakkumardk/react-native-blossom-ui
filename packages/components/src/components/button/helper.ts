import {ColorValue} from 'react-native'
import {
  getTextColorName,
  getStatusColorName,
  getDarkenColor,
  getTransparentStatusColorName,
} from '../utils'
import {ButtonMode} from '../types'
import {BlossomStatus, BlossomThemeColors} from '../../common'

type ColorHelperFunctionsProps = {
  status: BlossomStatus
  mode: ButtonMode
  disabled?: boolean
  backgroundColor?: ColorValue
  colors: BlossomThemeColors
  isDark?: boolean
}

export const ColorHelper = {
  /**
   * @returns text color based on theme color which is evaluated based on status, mode & backgroundColor and it's luminance value
   */
  getTextColor: ({
    status,
    mode,
    backgroundColor,
    disabled,
    colors,
    isDark,
  }: ColorHelperFunctionsProps) => {
    const color =
      disabled || mode === 'filled'
        ? colors[getTextColorName(backgroundColor, isDark, disabled, mode)]
        : colors[getStatusColorName(status, isDark)]

    return color
  },

  /**
   * @returns button background color based on it's status and mode
   */
  getButtonColor: ({
    status,
    mode,
    disabled,
    colors,
    isDark,
  }: Omit<ColorHelperFunctionsProps, 'backgroundColor'>) => {
    const modeColorMap: Record<
      ButtonMode,
      {
        true: string
        false: string
      }
    > = {
      filled: {
        true: colors.background300,
        false: colors[getStatusColorName(status, isDark)],
      },
      tinted: {
        true: colors.background200,
        false:
          colors[getTransparentStatusColorName(status, isDark ? '200' : '100')],
      },
      outlined: {
        true: colors.background100,
        false: colors.background100,
      },
      plain: {
        true: colors.background100,
        false: colors.background100,
      },
    }

    const color = modeColorMap[mode][disabled ? 'true' : 'false']

    return color
  },

  /**
   * @returns hovered & pressed color of the button based on it's status & mode which will be it's lighter/transparent color
   */
  getButtonStateColor({
    state,
    status,
    mode,
    backgroundColor,
    disabled,
    colors,
    isDark,
  }: {state: 'hovered' | 'pressed'} & ColorHelperFunctionsProps) {
    const bgColor = backgroundColor
    const buttonColor = this.getButtonColor({
      status,
      mode,
      disabled,
      colors,
      isDark,
    })

    const hoverColorMap: Record<ButtonMode, keyof BlossomThemeColors> = {
      filled: `${status}600`,
      tinted: `${status}Transparent${isDark ? '300' : '200'}`,
      outlined: `${status}Transparent${isDark ? '200' : '100'}`,
      plain: `${status}Transparent${isDark ? '200' : '100'}`,
    }

    const pressColorMap: Record<ButtonMode, keyof BlossomThemeColors> = {
      filled: `${status}700`,
      tinted: `${status}Transparent${isDark ? '400' : '300'}`,
      outlined: `${status}Transparent${isDark ? '300' : '200'}`,
      plain: `${status}Transparent${isDark ? '300' : '200'}`,
    }

    let color =
      colors[state === 'pressed' ? pressColorMap[mode] : hoverColorMap[mode]]

    if (bgColor !== buttonColor) {
      const alphaColorMap: Record<typeof state, number> = {
        hovered: mode === 'filled' ? 0.6 : 0.4,
        pressed: mode === 'filled' ? 0.8 : 0.5,
      }
      color = getDarkenColor(bgColor as string, alphaColorMap[state])
    }

    return color
  },
}
