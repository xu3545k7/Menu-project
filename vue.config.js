const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Menu-project/'
    : '/',
  chainWebpack: config => {
    config.module.rule('images').set('type', 'asset/resource');
  }
});