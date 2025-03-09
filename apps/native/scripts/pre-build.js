/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const appJson = require('../app.json')

const webConfig = {
  output: 'server',
  bundler: 'metro',
}

let newJson = JSON.parse(JSON.stringify(appJson))

newJson = {
  expo: {
    ...appJson.expo,
    web: {
      ...appJson.expo.web,
      ...webConfig,
    },
  },
}

try {
  console.log(JSON.stringify(newJson, null, 2))
} catch (error) {
  console.log(JSON.stringify({}, null, 2))
}
