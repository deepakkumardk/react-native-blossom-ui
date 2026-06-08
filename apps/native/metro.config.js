/* eslint-disable @typescript-eslint/no-var-requires */
// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config')
const path = require('path')

// const {
//   wrapWithReanimatedMetroConfig,
// } = require('react-native-reanimated/metro-config')

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, '../..')
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true
// config.resolver.disableHierarchicalLookup = false

// 4. Prevent Metro from resolving @types packages as runtime modules
// config.resolver.blockList = [
//   ...(config.resolver.blockList || []),
//   // Block @types packages from being resolved as runtime dependencies
//   /\/@types\/[^/]+\/package\.json$/,
// ]

// module.exports = wrapWithReanimatedMetroConfig(config)
module.exports = config
