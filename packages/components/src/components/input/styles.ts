import {Platform} from 'react-native'

export const textInputSizeStylesMap = {
  small: {
    inputText: {
      paddingVertical: Platform.OS === 'android' ? 3 : 7,
      fontSize: 14,
    },
  },
  medium: {
    inputText: {
      paddingVertical: Platform.OS === 'android' ? 6 : 10,
      fontSize: 16,
    },
  },
  large: {
    inputText: {
      paddingVertical: Platform.OS === 'android' ? 9 : 13,
      fontSize: 17,
    },
  },
}
