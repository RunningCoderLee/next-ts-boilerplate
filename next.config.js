const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const path = require('path')
const withAlias = require('./plugins/withAlias')
const withAntD = require('./plugins/withAntD')

const nextConfig = {
  // distDir: 'build',
  // webpack: (config, { isServer }) => {
  // },
}

module.exports = withPlugins(
  [
    [
      withAlias,
      {
        alias: {
          '-': path.join(__dirname),
        },
      },
    ],
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          // importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
    ],
    withAntD,
  ],
  nextConfig
)
