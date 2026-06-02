import React from 'react'
import {ExpoRoot} from 'expo-router'
import Head from 'expo-router/head'

const isSnackEnv = () => {
  try {
    // eslint-disable-next-line no-restricted-globals
    return location?.hostname.includes('snack-runtime')
  } catch (error) {
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IS_SNACK = isSnackEnv()
// console.log('IS_SNACK:', IS_SNACK)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const App = require.context('./app', true) as any

/**
 * Will be only used by Snack Web, as mobile will go to _layout file as entry file
 */
export default function ExpoRouterApp() {
  return (
    <Head.Provider>
      <ExpoRoot
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        context={App}
        location="/"
      />
    </Head.Provider>
  )
}
