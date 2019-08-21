module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { alias: originalAlias } = config.resolve
      const { alias } = nextConfig

      config.resolve.alias = { ...originalAlias, ...alias }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
