<h1 align="center">🌸 Blossom UI</h1>

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

<p align="center">
  <a href="https://docs-react-native-blossom-ui.vercel.app/">📚 Documentation</a> |
  <a href="https://react-native-blossom-ui-showcase-app.vercel.app">🌟 Live Demo</a>
</p>

---

## ✨ Features

- 📦 **40+ Ready-to-use Components** — Buttons, Inputs, Cards, Modals, and more
- 🎨 **Themeable & Dark Mode** — Out-of-the-box theme support, easy customization
- ⚡ **Fast & Lightweight** — No unnecessary dependencies, optimized for performance
- 🛠️ **Fully Customizable** — Override styles, icons, and behaviors to match your brand
- 🔣 **Icon Support** — Seamless integration with react-native-vector-icons
- 🚀 **Expo & CLI Support** — Works with both Expo and React Native CLI
- 🌍 **Cross-Platform** — Consistent experience on Android, iOS, and Web

## 🚀 Getting Started

Install Blossom UI and its peer dependency:

```bash
yarn add @react-native-blossom-ui/components react-native-vector-icons
```

> For `react-native-vector-icons`, follow [these extra steps](https://github.com/oblador/react-native-vector-icons) if needed.

## 🏗️ Usage Example

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

Explore more components and usage in the [Documentation](https://docs-react-native-blossom-ui.vercel.app/).

## Packages Available

- **@react-native-blossom-ui/components** - Curated set of basic components
- **@react-native-blossom-ui/dates** - Dates related components like DatePicker, Calendar etc.
- **@react-native-blossom-ui/overlays** - Overlay/Modal related components

## 💡 Why Blossom UI?

- **All-in-one**: No more hunting for multiple UI libraries
- **Developer-first**: Easy to use, well-documented, and actively maintained
- **Customizable**: Make your app stand out with your own design system
- **Open source**: Join our community and contribute!

## 🤝 Contributing

We welcome contributions! Please check out our [contribution guide](CONTRIBUTION.md) and help us make Blossom UI even better.

## 🙏 Thanks

- [mantine](https://mantine.dev) for inspiration from its awesome components

## 📄 License

[MIT License](LICENSE)
