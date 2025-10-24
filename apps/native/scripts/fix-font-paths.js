/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const distDir = path.resolve('dist')

const fontsDir = path.join(distDir, 'fonts')
const expectedDir = path.join(
  distDir,
  '__node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts',
)

fs.mkdirSync(expectedDir, {recursive: true})

// Copy all font files to the expected directory
fs.readdirSync(fontsDir).forEach((file) => {
  if (file.endsWith('.ttf')) {
    const src = path.join(fontsDir, file)
    console.log('fs  -> src', src)
    const dest = path.join(expectedDir, file)
    console.log('fs -> dest', dest)
    fs.copyFileSync(src, dest)
  }
})

console.log('Fixed Expo Web font paths for Vercel')
