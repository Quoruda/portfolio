const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  chainWebpack: config => {
    config.module
        .rule('raw')
        .test(/\.(txt|md)$/) // ← adapte selon ton besoin
        .use('raw-loader')
        .loader('raw-loader')
        .end();
  }

})