/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
const {Snack} = require('snack-sdk')
const fs = require('fs')
const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob')

const appDir = path.resolve(__dirname, '../')

// Read SDK version from package.json
const pkg = JSON.parse(
  fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'),
)

// Snack SDK currently supports up to 54.0.0
const sdkVersion = '54.0.0'

// Helper to read all files in a folder recursively
function getFilesFromDir(dir, base = '') {
  const files = {}
  if (!fs.existsSync(dir)) return files
  const pattern = path.join(dir, '**/*.*')
  glob.sync(pattern, {nodir: true}).forEach((file) => {
    const snackPath = path
      .join(base, path.relative(dir, file))
      .replace(/\\/g, '/')
    files[snackPath] = {
      type: 'CODE',
      contents: fs.readFileSync(file, 'utf8'),
    }
  })
  return files
}

const files = {
  ...getFilesFromDir(path.join(appDir, 'app'), 'app'),
  ...getFilesFromDir(path.join(appDir, 'assets'), 'assets'),
  ...getFilesFromDir(path.join(appDir, 'components'), 'components'),
  ...getFilesFromDir(path.join(appDir, 'themes'), 'themes'),
  'App.tsx': {
    type: 'CODE',
    contents: fs.readFileSync(path.join(appDir, 'App.tsx'), 'utf8'),
  },
  'package.json': {
    type: 'CODE',
    contents: fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'),
  },
}

// Get access token from command-line args, env, or fallback
function getAccessToken() {
  // Find --accessToken= in process.argv
  const arg = process.argv.find((a) => a.startsWith('--accessToken='))
  if (arg) {
    return arg.split('=')[1]
  }

  throw new Error('No access token provided. Use --accessToken=<token>')
}

async function uploadToSnack() {
  // Read blossom package version from components/package.json
  const componentsPkg = JSON.parse(
    fs.readFileSync(
      path.join(appDir, '../..', 'packages/components/package.json'),
      'utf8',
    ),
  )
  const blossomVersion = componentsPkg.version

  // Filter dependencies for Snack compatibility (remove wildcards, local, and non-string versions)
  const snackDependencies = {}
  Object.entries(pkg.dependencies || {}).forEach(([dep, version]) => {
    if (typeof version === 'string' && !version.startsWith('file:')) {
      // Use blossomVersion for blossom packages
      if (
        [
          '@react-native-blossom-ui/components',
          '@react-native-blossom-ui/dates',
          '@react-native-blossom-ui/overlays',
          '@react-native-blossom-ui/showcase',
        ].includes(dep)
      ) {
        snackDependencies[dep] = {version: blossomVersion}
      } else {
        snackDependencies[dep] = {version}
      }
    }
  })

  // Expo 54 compatible dependencies
  snackDependencies['expo-router/head'] = {version: '~6.0.24'}
  snackDependencies['react-native-web'] = {version: '~0.21.0'}
  snackDependencies['@expo/vector-icons'] = {version: '^15.0.3'}

  const nodeEnv = process.env.NODE_ENV

  console.log('uploadToSnack -> process.env.NODE_ENV:', nodeEnv)
  // Validate NODE_ENV is set correctly (only 'production' or 'development')
  if (!['production', 'development'].includes(nodeEnv)) {
    throw new Error(
      `Invalid NODE_ENV ''. Expected 'development' or 'production'. Set NODE_ENV=development|production.`,
    )
  }

  const snackName = `Blossom UI Snack ${nodeEnv === 'production' ? '' : '- Development'}`
  const snack = new Snack({
    files,
    name: snackName,
    description: `Snack Demo for Blossom UI`,
    sdkVersion,
    dependencies: snackDependencies,
  })

  snack.setUser({
    accessToken: getAccessToken(),
  })

  snack.setOnline(true)
  // Wait for everything to be uploaded/resolved
  const res = await snack.saveAsync({})
  console.debug(`Snack Web URL: https://snack.expo.dev/${res.id}`)
}

uploadToSnack()
  .then(() => {
    console.debug('Snack upload completed')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Snack upload failed:', err)
    process.exit(1)
  })
