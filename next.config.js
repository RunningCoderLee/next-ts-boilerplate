const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const cssLoaderGetLocalIdent = require("css-loader/lib/getLocalIdent.js");

module.exports = withSass(withCSS(withLess({
  cssModules: true,
  cssLoaderOptions: {
    // importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    getLocalIdent: (context, localIdentName, localName, options) => {
      let hz = context.resourcePath.replace(context.rootContext, "");

      if (/node_modules/.test(hz)) {
        return localName;
      } else {
        return cssLoaderGetLocalIdent(
          context,
          localIdentName,
          localName,
          options
        ); 
      }
    }
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    // modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const antMobileStyles = /antd-mobile\/.*?\/style.*?/

      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles) || request.match(antMobileStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      }, {
        test: antStyles,
        use: 'null-loader'
      })
    }
    return config
  },
})))
