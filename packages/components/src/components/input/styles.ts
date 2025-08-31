import {Platform} from 'react-native'

export const textInputSizeStylesMap = {
  small: {
    inputText: {
      paddingVertical: Platform.OS === 'android' ? 1 : 7,
      fontSize: 14,
    },
  },
  medium: {
    inputText: {
      paddingVertical: Platform.OS === 'android' ? 4 : 10,
      fontSize: 16,
    },
  },
  large: {
    inputText: {
      paddingVertical: Platform.OS === 'android' ? 6 : 12,
      fontSize: 17,
    },
  },
}
