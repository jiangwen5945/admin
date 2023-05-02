const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "瞎猫管理系统";
        return args;
      })
  },
  // webpack-dev-server开启IP和域名访问权限
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all'
  }
})
