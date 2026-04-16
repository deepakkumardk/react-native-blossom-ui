# @react-native-blossom-ui/overlays

<a href="https://www.npmjs.com/package/@react-native-blossom-ui/overlays">
    <img src="https://img.shields.io/npm/dm/@react-native-blossom-ui/overlays.svg" alt="NPM downloads">
</a>

# Blossom UI Overlays

Blossom UI Overlays offers all the components related to overlays like toast, snackbar, portal, menu etc.

## Features

- 📅 Overlay, toast, snackbar etc.
- 🎨 Themeable and customizable

## Installation

Install:

```sh
yarn add @react-native-blossom-ui/overlays
```

## Usage

Import and use a overlays in your app:

```tsx
import React from 'react'
import {Button} from '@react-native-blossom-ui/components'
import {useOverlay} from '@react-native-blossom-ui/overlays'

export default function MyScreen() {
  const overlay = useOverlay()

  return (
    <Button
      title="Show overlay"
      onPress={() =>
        overlay.show({
          // show props
        })
      }
    />
  )
}
```

## Documentation

Full documentation and API reference are available at:

- [Blossom UI Documentation](https://docs-react-native-blossom-ui.vercel.app/docs/category/overlays)
- [Main Repository README](https://github.com/deepakkumardk/react-native-blossom-ui#readme)

## License

This project is licensed under the **MIT** License.
