// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })

module.exports = {
  pwa: {
    name: 'BW Terminal',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080, // PUERTO DE LA APP
    https: false // HTTPS
  },
  transpileDependencies: true
}