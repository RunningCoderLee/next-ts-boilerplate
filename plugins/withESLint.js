module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev } = options

      if (dev) {
        config.module.rules.unshift({
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                emitWarning: true,
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                // eslintPath: require.resolve('eslint'),
              },
              loader: 'eslint-loader',
            },
          ],
          exclude: ['/node_modules/', '/.next/', '/out/'],
        })
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
