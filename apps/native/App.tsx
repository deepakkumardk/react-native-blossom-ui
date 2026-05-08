// App.tsx
import React, {useState} from 'react'
import {ExpoRoot} from 'expo-router'
import Head from 'expo-router/head'
import {BlossomThemeProvider} from '@react-native-blossom-ui/components'
import RootLayout from './components/RootLayout'
import lightTheme from './themes/lightTheme.json'
import darkTheme from './themes/darkTheme.json'
import options from './themes/options.json'

const isSnackEnv = () => {
  try {
    // eslint-disable-next-line no-restricted-globals
    return location?.hostname.includes('snack-web')
  } catch (error) {
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const App = require.context('./app', true) as any

export default function ExpoRouterApp() {
  const IS_SNACK = isSnackEnv()
  const [isDark, setIsDark] = useState(false)

  // Normal path (non-Snack) — just mount RootLayout / ExpoRoot as you already had
  // if (true) {
  //   return (
  //     <Head.Provider>
  //       <RootLayout>
  //         <ExpoRoot
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //           context={App}
  //           location="/"
  //         />
  //       </RootLayout>
  //     </Head.Provider>
  //   )
  // }

  // Snack path — put the BlossomThemeProvider ABOVE ExpoRoot and provide bridge
  return (
    <Head.Provider>
      {/* <SnackThemeBridge.Provider value={{isSnack: true, isDark, setIsDark}}> */}
      <RootLayout>
        <ExpoRoot
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          context={App}
          location="/"
        />
      </RootLayout>
      {/* </SnackThemeBridge.Provider> */}
    </Head.Provider>
  )
}
