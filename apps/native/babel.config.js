/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo',
      // '@babel/preset-flow',
      // 'module:metro-react-native-babel-preset',
    ],
    plugins: [
      // 'expo-router/babel',
      // '@babel/plugin-proposal-export-namespace-from',
      // 'react-native-reanimated/plugin',
    ],
  }
}
