<h1 align="center">
  React-Native Blossom UI
</h1>

<h4 align="center">
  Build Awesome Blossom UI
</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-native-blossom-ui/components">
    <img src="https://img.shields.io/npm/v/@react-native-blossom-ui/components.svg" alt="npm"/>
  </a>
  <a href="https://www.npmjs.com/package/@react-native-blossom-ui/components">
    <img src="https://img.shields.io/github/stars/deepakkumardk/react-native-blossom-ui?label=stars&logo&style=flat-square">
   </a>
  <a href="https://www.npmjs.com/package/@react-native-blossom-ui/components">
    <img src="https://img.shields.io/npm/dm/@react-native-blossom-ui/components.svg?style=flat-square" alt="NPM downloads">
  </a>
  <a href="/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"/>
  </a>
</p>

<div align="center">
  <h4><a href="https://docs-react-native-blossom-ui.vercel.app/">Documentation</a></h4>
</div>

Blossom UI helps you to create an awesome UI on mobile and web platform. This library is based on custom design system and it's totally configurable.

- **📦️ Base components** - This contains all the basic components that react-native provides
- **🎨 Theme Support** - Out of the box Theme support with dark theme mode
- **⚙️ Customizability** - You can customize all the components to match your UI needs
- **🔣 Icons Support** - _react-native-vector-icons_ support out of the box with themes
- **<img src="https://reactnative.dev/img/header_logo.svg" width="20" height="20" align="center" /> CLI & Expo Support** - Support both CLI & Expo apps
- **📈 25+ components** - Support 30+ components & counting++

## Why use Blossom-UI?

Blossom-UI is the new guy in the react-native open source community.

- It was made keeping the vast amount of **mobile components** requirement.
- Most of the library do not provide a full set of components instead they just ask to install the 3rd party library, here you will get the most of it in **one pack**.
- You get the **full customizability** with all the components so that you can make you app faster matching your **UI designs**.
- You also get the same experience on **all platforms** including android, iOS & web.

## Installation

```bash
yarn add @react-native-blossom-ui/components
```

Next, install the required peer dependency of the library

```bash
yarn add react-native-vector-icons
```

Follow the extra [installation steps](https://github.com/oblador/react-native-vector-icons) for the above library.

## Usage

Let's see a quick example of how to use a Input and a button

```tsx
import {Button, TextInput, View} from '@react-native-blossom-ui/components'

function MyApp() {
  return (
    <View>
      <TextInput label="Name" placeholder="Enter name" />
      <Button onPress={() => alert('Form Submitted')}>Submit</Button>
    </View>
  )
}
```

## Thanks

- [mantine](https://mantine.dev) for inspiration from it's awesome components

## License

[MIT License](LICENSE)
